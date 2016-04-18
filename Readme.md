![Eve](eve.png)

A simple bot to work with the new [Facebook Messenger API](https://messengerplatform.fb.com/), using [Wit.ai](https://wit.ai).

### Example

- Say Hi to [Poncho](https://m.me/hiponcho)
- Read News from [CNN](https://m.me/CNN)

### Getting Started

- [Wit.ai bot setup](https://wit.ai/docs/quickstart)
- [Heroku setup](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
- [Mesenger setup](https://developers.facebook.com/docs/messenger-platform/quickstart)

Some steps from Messenger Setup like Webhooks, you have to configure Heroku first.

### Install dependencies

```sh
npm install
```

### Structure

```sh
├── Procfile  # tells to heroku what to do
├── bot.js # our bot actions
├── fb-connect.js # connection to facebook uses FB_PAGE_TOKEN
├── index.js # express layer
├── parser.js # our message parser
├── sessions.js # find our define our sessionId
└── settings.js # exports our environmet variables
```

### Define variables on Heroku

In order to work with Facebook and Wit Authentication, you have to create those environment variables on Heroku.

```sh
WIT_TOKEN
FB_PAGE_ID
FB_PAGE_TOKEN
FB_VERIFY_TOKEN
```

### Link and push to heroku

```sh
heroku create
git push heroku master
```

### License

This software is free and open source, distributed under the The MIT License. So feel free to use this without linking back to me or using a disclaimer.

If you’d like to give me credit somewhere on your blog or tweet a shout out to [@willian_justen](https://twitter.com/willian_justen), that would be pretty sweet.
