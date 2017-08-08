![Banner](htdocs/assets/redirector-banner.jpg "Banner")
# redirector
> Never type urls in your test devices again!

Use case: Multiple test devices, multiple persons who are testing

Redirector allows you to set your test url on all your devices at once for testing a certain site.
Because of its api you can even set the url automagically for your project using a taskrunner like gulp.

This tool works best in conjunction with [Browsersync](browsersync.io).
## Installing / Getting started

1.  Clone the repo and put its content on a PHP-capable server.
    * Server has to be in the same network as the devices you're going to test.
    * if you want to do a quick test run on your local machine you can run
    ```bash
    php -S localhost:8000
    ``` 
    in the `redirector` directory ([php must be installed for this to work](http://php.net/manual/en/features.commandline.webserver.php))
2. Set the Browser-Startpage in all your testdevices to the URL to ``redirector``
3. Set your testpage via `redirector` frontend or by using the api (see 'configuration')

The given url for the testpage is checked and if it's available you get redirected on all devices.
## Developing

This project (because of its small size) was explicitly built without using a big toolchain.
Libraries are pulled from CDN.

To start testing install php and do:

```bash
php -S localhost:8000
``` 


### Building

There is no build step needed *yay*

### Deploying / Publishing

If you don't care about a readme.md and stuff lying around on your server:
Just clone the repo and push it to your server.

## Features

What's all the bells and whistles this project can perform?

[... coming soon ...]

## Configuration / API Documentation

You will probably mainly use the get-request to set a new url programatically.
```
/api?title=[your title]&url=[your url]
```

#### /api
Type: `String`  

Returns a list of the last 20 saved url's

Example:
```
/api
```
Output: History of Urls including the new one 
 ```json
[
  {
    "url": "https://www.google.de",
    "title": "Testpage:%20Google"
  },
  {
    "...": "..."
  },
  {
   "...": "..."
  }
]
```

#### /api?checkUrl=[your url]
Type: `String`  

Returns the status code for querying a given url

Example:
```
/api?checkUrl=https://www.ebay.de
```
Output: 
 ```json
 {
   "status": 302
 }
```

#### /api?title=[your title]&url=[your url]
Type: `String`  

Both arguments are mandatory

Example:
```
/api?title=Testpage:%20Google&url=https://www.google.de
```
Output: History of Urls including the new one
 ```json
[
  {
    "url": "https://www.google.de",
    "title": "Testpage:%20Google"
  },
  {
    "...": "..."
  },
  {
   "...": "..."
  }
]
```

## Contributing

You are very welcome to contribute.
 
For example one could
 * make a proper api
 * implement the "backend" in another language instead of php
 * whatever makes sense to you
 
If you want to make this tool better, fork the repo send me a pull request :-) 

## [Licensing](./LICENSE)


