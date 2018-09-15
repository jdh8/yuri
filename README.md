# Yuri
<img src="https://raw.githubusercontent.com/owm111/yuri/master/assets/avatar-circle-200.png" align="right" title="H-hi there, my name is Yuri"/>

> A Discord bot

> **Hey there!** This bot is currently in public beta, so it may be lacking in features, but do not worry, as it is being actively developed! Check out the [to do section](#to-do-list) of this file to see what is coming, and send in an issue or pull request to help with adding content and fixing bugs!

Yuri is a multi-purpose Discord bot, based off the character Yuri from *Doki Doki Literature Club!*, she aims to have useful and high-quality commands to make your server better. Her current list of features is... not much (as mentioned above)... but Yuri is currently reading up on how to be a great Discord bot, so expect a lot more to come!

Currently, here is what Yuri can do for you...

<dl>
  <dt>Translation</dt>
  <dd>...between almost 100 languages</dd>
  <dt>Composite sprites</dt>
  <dd>...of herself upon request</dd>
  <dt>Give kisses and hugs</dt>
  <dd>Although she might be shy at first, she's pretty cuddly when she gets to know you!</dd>
</dl>

## To Do List
> Stuff to come!

You can also check out the [roadmap](https://github.com/owm111/knife-wife/projects/1) for a more detailed and technical list, but here are the highlights:
- [ ] Editable prefix
- [ ] Role caching
- [ ] Command and group disabling
- [ ] Administrative system (like you've never seen before, making moderation an breeze!)
- [ ] Yuri-like AI chat bot?
- [ ] Run commands by sliding into her DMs
- [ ] More useful (and not-so-useful-but-still-fun) commands!
- [ ] A "non weeb" version (because some people are into that)

## Invite Link
> Get Yuri in your server!

[![Invite Yuri!](https://raw.githubusercontent.com/owm111/yuri/master/assets/btn-invite.png)](https://discordapp.com/oauth2/authorize?&client_id=407652636054257665&scope=bot)

Another useful link is to the [support server](#support) (more details below)

## Usage
> How to let Yuri help you out!

Yuri's default prefix is `y.<command>` or `Y.<command>` (it's case insensitive). To run the help command, and see a list of commands, you'd type:
```
y.help
```
...and Yuri will give you a full list of commands!

### Commands
On the topic of a full list of commands, here is the current full list of commands (from `y.help`):

>Use `y.help <command>` for more information about a command.  
**Core:** help, about, repo, support, ping, invite  
**Fun:** greet, sprite, kiss, hug  
**Utility:** translate

A full command list, along with help for each, might be added to this file in the future.

## Support
> We can help you out!

If you need help with any part of you usage of Yuri, feel free to join our support server and ask us there!

[![Join the server](https://github.com/owm111/yuri/blob/master/assets/btn-server.png](https://discord.gg/PEgCkej)

Talk there doesn't *need* to be about getting help, just joining to talk with others is perfectly fine! Let's build a community!

### FAQ
If there are questions that are asked a bunch, they will be put here.

## Developing, Self-Hosting and Contributing
> FOSS FTW!

As Yuri is an open source project, you can modify and make your own version of her. This section contains some information on doing that and contributing to this repository.
As it has not been split into its own repository, there will also be information regarding the framework that Yuri is built upon here.

### Developing

#### Requirements and Beginning Steps
To start, here are the things you will need to begin:
- Node.js & npm ([download](https://nodejs.org/en/download/ "Download for Node LTS"))
- Some knowledge of JavaScript ([a great resource](https://developer.mozilla.org/en-US/docs/Web/javascript "Mozilla Developer Network Documentation"))
- Git (optional: if you have it and know how to use it, great, use it; if not, that's fine too, don't use it)

Once you have those, here's how you start:
1. **Acquire the source code.** This can be two ways, using Git and cloning/forking the repository (recommended, if you know how), or downloading a ZIP, which is also fine. Use whichever method you are comfortable with. You can find the "Download ZIP" option under the green button atop the file list.
2. **Install dependencies.** Dependencies are managed through npm (or yarn, if you use that); here is how to do it with npm:
```
npm i -D
```
This will give you the code and the tools to develop it.

That's it! You are now ready to start developing!

#### Useful Information
Here is some information that you might find helpful for developing Yuri.
Yuri is built off of her own [framework](#framework), so you can see that for information regarding its API.
The source code is written as [Node.js modules](https://nodejs.org/api/esm.html#esm_ecmascript_modules "Related reading"), which use the `.mjs` extension. They are exactly like regular `.js` files, but allow for the use of the  `import`/`export` keywords without the need for transpiling. However, in order to run them, the `--experimental-modules` option must be enabled when running `node`, but all the development tools and scripts account for this.
On the topic of npm scripts, here is a list of scripts that relate to the bot:

Name | Function
---|---
`start` | Runs the bot and connects to Discord
`dev` | A development instance, with live reload (i.e. every time you save the instance restarts automatically)

### Contributing
You want to help out making Yuri best bot? Great! You can do this by submitting pull requests and issues, make sure you use the commit style and linter as the rest of the project! **A more detailed guide will come in the future.**

You can help the development of the framework out by answering [this question](https://stackoverflow.com/questions/51637856/cannot-find-postgresql-files-clusters-or-service-what-to-do).

### Framework
Yuri is built on her own framework, which will eventually split into its own repo/package so anyone can use it!
The framework is contained withing the `lib/` directory so you can check it out. 
**Documentation will be added in the future.**

## License
yuri-bot is under the [MIT license](https://owm.mit-license.org/)

*Doki Doki Literature Club!* is copyright of Team Salvato. All artwork used is copywrite of their respective artists.

If any artists would like their copyrighted material to be removed, please contact the bot developer (see the LICENSE for contact info).
