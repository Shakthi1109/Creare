import Agenda from "agenda";
import { Socket } from "dgram";
class Scheduler {
  agenda: Agenda = null;

  async connect(mongoConnectionUri: string) {
    this.agenda = new Agenda({
      db: { address: mongoConnectionUri, collection: "schedules" },
    });
    await new Promise((resolve) =>
      this.agenda.once("ready", () => {
        console.log("Scheduler is ready");
        this.agenda.start();
        resolve();
      })
    );
  }

  async scheduleJob(
    jobName: string,
    jobStartDateTime: Date,
    jobFunction: Function,
    jobData?: any
  ) {
    if (!this.agenda) throw new Error("cannot schedule before connection");

    this.agenda.define(jobName, async (job, done) => {
      await jobFunction(job.attrs.data);
      done();
    });

    this.agenda.schedule(jobStartDateTime, jobName, jobData);
  }

  async repeatJob(
    jobName: string,
    jobFunction: Function,
    jobInterval: string,
    jobData?: any
  ) {
    if (!this.agenda) throw new Error("cannot schedule before connection");

    this.agenda.define(jobName, async (job, done) => {
      await jobFunction(job.attrs.data);
      done();
    });
    this.agenda.every(jobInterval, jobName, jobData);
  }

  async cancel(jobName: string) {
    await this.agenda.cancel({ name: jobName });
  }

  async removeAllJobs() {
    const jobsRemoved = await this.agenda.purge();
    console.log({ jobsRemoved });
  }
}

export const scheduler = new Scheduler();
