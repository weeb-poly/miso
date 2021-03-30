# Miso
Miso is a project for archiving graphic novels, particularly manga pages from sites. Used in other weeb poly projects like manga-roulette. Written in Node.js at the moment.

<img src="miso.png" alt="miso" width="200" />

Goals: 
**Goals:**

- [ ] reorganize code base
    - [X] In process
- [ ] Add new sites to the list
- [ ] Different Download options
- [ ] Add CLI interface

## requirements:
node.js packages *https* and *fs*. these should come standard for most versions of node.
Also requires puppeteer, you will have to download this from npm:

```bash
npm i puppeteer
# or "yarn add puppeteer"
```

## How to run

- Make sure you have the right npm libraries, at the moment, they are https, fs, and puppeteer. Puppeteer is the only one not included by default. Afterwards, run `node <file name>` to test it out. At the moment, this should be enough, as the CLI isnt complete yet, and this should be sufficient for testing files.


## Dev log
dev log is located in the [wiki](https://github.com/weeb-poly/miso/wiki/Weekly_Log)

<img src="miso-all.png" alt="alt text" width="400" />
