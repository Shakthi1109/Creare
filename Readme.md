# Creare
### E-Learning platform

### Creare is an E-Learning and school mangement platform.

### Tech
We will be using number of open-source frameworks and libraries to work properly:
- [NodeJs] - Base Javascript framework for writing code
- [ReactJs] - To create web pages with JS
- [ExpressJs] - To create Server
- [NextJs] - To enhance ReactJs capabilities with Server Side Rendering
- [Typescript] - to strongly typed code with proper data types
- [MongooseJs] - to use compiled MongoDB with Express

### Installation

1. Open Terminal / Command Prompt
2. run command ```git clone https://github.com/negocis/Creare.git```
3. Change directory to project directory
4. run command ```npm run install ```
5. once installation is done, run command ```npm run dev```
5. wait until you see ```Creare ready on port 3000 !!!```

to verify if the server is running, open browser and visit
####  For Front-end pages 

```sh
http://localhost:3000 
```
```sh
http://localhost:3000/dummy
```
#### For Back-end (only for testing purpose)
```sh
http://localhost:3000/api
```

### To create pages in Front-end

1. open ```/src``` folder
2. open ```/pages``` folder
3. create a file with ```<routename>.tsx```

-- Be careful as to route to your page is same as your file name, 
so in case file is named ```dummy.tsx``` . The route to access it is ```http://localhost:3000/dummy``` 

--  if the route has be of form ```http://localhost:3000/user/profile```
Then create a folder named ```user``` under ```/pages``` folder and create ```profile.tsx``` file inside it.
[NodeJs]:<https://nodejs.org/en/>
[ReactJs]:<https://reactjs.org/>
[ExpressJs]:<https://expressjs.com/> 
[NextJs]:<https://nextjs.org/>
[Typescript]:<https://www.typescriptlang.org/>
[MongooseJs]:<https://mongoosejs.com/>

