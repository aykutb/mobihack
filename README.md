mobihack
========

This project is a rating project for Mobilike job application and developed by Aykut Bal.

## Installation

```bash
$ npm install 
```
Since all the api functions return just status, you can check the /route/index.js to see what is happening actually.

## Assignments

####Assignment 1

Divide 22 by 7 until you get to the 1000th digit of PI number. Do not cache anything, this task must be run for each request.

####Assignment 2

Open a plain text log file with UTF-8 encoding and write a line consisting of user’s ip address, current unix timestamp and a random alphanumeric 255 characters long string in this format:

[USER_IP_ADDRESS]::[TIMESTAMP]::[RANDOM_STRING]

After the write operation you should close the log file.
Do not use an utility/helper library for log operations.

## Usage

`mobihack` is a restful api and practicising exercise to ramp up with nodejs. It has two functions; 'shoot-for-my-cpu' and 'shoot-for-my-disk'. There is already deployed version of `mobihack` on Azure platform, you can check the functions by calling HTTP requests on:
  - http://mobilhack.azurewebsites.net/shoot-for-my-cpu
  - http://mobilhack.azurewebsites.net/shoot-for-my-disk
PS. It's deployed on Small machine configuration on Azure ( 1 core-1.75GB Memory)
