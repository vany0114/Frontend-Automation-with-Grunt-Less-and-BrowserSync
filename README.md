# Frontend Automation with Grunt, Less and BrowserSync

The main idea is to share and explore a little bit about frontend technologies, like [Grunt](https://gruntjs.com/), to automate task like minification, compilation, unit testing and so on. Also takes a look a little example about Css pre-processors like [Less](http://lesscss.org/) and a cool tool such [browserSync](https://browsersync.io/) that it makes easier to test our changes in a real time way.
BTW I took advantage for show how Angular JS works, so I use concepts like controllers, factories, directives, etc.

## Note
> I'm not an expert on frontend technologies, I just wanna share a code that I explore by myself in order to learn new things and I hope will be useful for you.
**¡¡IMPORTANT: I made this code about one year!!!**

## Prerequisites and Installation Requirements
1. Install [Node JS](https://nodejs.org/es/)
2. Get an IDE, like [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/) or whatever you prefer (even a notepad)

## Instructions
1. Clone this repository.
2. Execute `npm install` command in order to install all dependencies or packages what I used to the lab.(It's important you're on the main path on the console, e.g: `cd mypath\Frontend_Lab`)
3. Execute `grunt` command in order to start the automated tasks configured on _Gruntfile.js_
4. Execute `http-server` (in another command window) in order to serve the application
5. Run the main page on node server created earlier, e.g: http://127.0.0.1:8080/views/shared.html#/

## Understanding the Code
### Less Example:
```less
@mainColor:   		#D23C00;
@header-footer-height:  70px;

.orangeMenu{
  background-color: @mainColor;
  padding-top: 1.5%;
	ul{
	  padding-top: 3%;
	}
}
.navbar-main{
	background-color: @mainColor;
	position: relative;
	min-height: @header-footer-height;
}
```
In the behind code, you can see a few interesting stuff, the usage of variables and a way to define nested rules easier and more readable and understandable (I have another example with functions you can find in the code, also you can review the Less documentation because Less you be able to do a lot of amazing things). When grunt task compile that, the css outcome is the following:
```css
.orangeMenu {
  background-color: #D23C00;
  padding-top: 1.5%;
}
.orangeMenu ul {
  padding-top: 3%;
}
.navbar-main {
  background-color: #D23C00;
  position: relative;
  min-height: 70px;
}
```
So in order to compile the less file, I got a grunt task in _Gruntfile.js_ called "less", which is defined the following way:
```javascript
less: {
  development: {
    options: {
      compress: false
    },
    files: {
      "dist/css/site.css": "build/less/site.less",          
    }
  },
  production: {
    options: {
      compress: true
    },
    files: {
      "dist/css/site.min.css": "build/less/site.less",          
    }
  }
}
```
This task means that "site.less" file, is compiled in "site.css" file on "dist/css" path, besides, notice there are two sections defined about the environments, this is because you can have diferent ways to do the task depending on your environment, for this example the only difference is on development environment the css file is minified.
In order to compile the less file, I used **_grunt-contrib-less_** package, like this:
```javascript
grunt.loadNpmTasks('grunt-contrib-less');
```
## Concat task
You can concatenate files with Grunt, for example I got a task to put all my scripts together into one only file.
```javascript
concat: {
    dist: {
        files: {
            'dist/js/app.js': ['scripts/app/module.js', 'scripts/app/**/*.js']
        }
    },
}
```
This means all my scripts are together into "app.js" file, in this case, with the condition that the content of "module.js" file is always the first into the file. This is because I need to ensure the angular module was created before the rest of angular stuff in order to avoid errors.
In order to concat the files, I used **_grunt-contrib-concat_** package, like this:
```javascript
grunt.loadNpmTasks('grunt-contrib-concat');
```

## Minification
Grunt allows to you obfuscate or minify the code in a easy way.
```javascript
uglify: {
  options: {
    sourceMap: true,
    sourceMapIncludeSources: true
  },
  my_target: {
    files: {
      'dist/js/app.min.js': ['dist/js/app.js']
    }
  }
},
```
In this task you can see a couple options, **_sourceMap_** option Generates a map with a default name for you and **_sourceMapIncludeSources_*t* option embed the content of your source files directly into the map, all of these to be able you make easy to debug when you need it (commonly on dev environment).
In order to minify the files, I used **_grunt-contrib-uglify_** package, like this:
```javascript
grunt.loadNpmTasks('grunt-contrib-uglify'); 
```

## Automation with Watch and BrowserSync
In development environments is important automate as many processes as you can, Grunt helps you to achieve that.
```javascript
watch: {
  styles: {      
    files: ["build/less/*.less"],
    tasks: ["less"]
  },
  scripts: {
    files: ["scripts/app/**/*.js"],
    tasks: ["concat", "uglify"]
  }
}
```
I defined a watch task for my styles and scripts, the style task compiles all less files everytime these one are modified or even tougth when it added (Notice that the task executes the less task created earlier).
In the other hand the script task concat and minify all of my javascript files into "scripts/app" path every time these one are modified, added or deleted.
In order to perform the Watch task, I used **_grunt-contrib-watch_** package, like this:
```javascript
grunt.loadNpmTasks('grunt-contrib-watch');
```
Another powefull and cool task is browserSync that allows to you to visualize all your changes in realtime, I mean, without update the browser in order to check out some changes, for example in an html, css or js file, because browserSync push the changes automaticly.
```javascript
browserSync: {
    dev: {
        bsFiles: {
            src : ['dist/css/*.css', 'dist/js/*.js', 'views/*.html']
        },
        options: {
            watchTask: true,
            host : "127.0.0.1"
        }
    }
}
```
In this case it pushes all changes to localhost site for whatever css, js or html file will be changed (Notice that I watch the files on "dist" folder, where are the files compiled, minified or concated). Thus after whatever change you do on css, javascript or html files, browserSync automatically updates for you on the web site that you are executing.
In order to perform the browserSync task, I used **_grunt-browser-sync_** package, like this:
```javascript
grunt.loadNpmTasks('grunt-browser-sync');
```
In order to browserSync works, is important to add this script in the main html:
```javascript
<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.8'><\/script>".replace("HOST", location.hostname));
//]]></script>
```
This script call the browserSync client that you have installed.

So you don't need worry about compile or make a manual change in order to test all your changes when you are developing, as you can see, you can mix a lot of task that Grunt provide you in order to automate you developing process.

Visit my blog <http://elvanydev.com/>
