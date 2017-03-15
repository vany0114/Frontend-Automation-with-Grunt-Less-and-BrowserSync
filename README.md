# Introduction

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
@mainColor:   				#D23C00;
@header-footer-height:   	70px;

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
In the behind code, you can see a few interesting stuff, the usage of variables and a way to define nested rules easier and more readable and understandable. When grunt task compile that, the css outcome is the following:
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
