![Banner](htdocs/assets/redirector-banner.jpg "Banner")
# redirector
> Never type urls in your test devices again!

Use case: Multiple test devices, multiple persons who want to run tests from their own machine

Redirector allows you to set your test url on all your devices at once for testing a certain site.
Because of its api you can even set the url automagically for your project using a taskrunner like gulp.

This tool works best in conjunction with [Browsersync](browsersync.io).
## Installing / Getting started

1.  Clone the repo and put the `htdocs` directory on a PHP-capable server.
    * Server has to be in the same network as the devices you're going to test.
    * if you want to do a quick test on your local machine you can run
    ```bash
    php -S localhost:8000 -t htdocs/
    ```
    ([php must be installed for this to work](http://php.net/manual/en/features.commandline.webserver.php))
2. Set the Browser-Startpage in all your testdevices to the URL of your server / the redirector `htdocs` directory
3. Set the page you want to test by opening up your new startpage or by using the api (see 'configuration')

The given url for your testpage is checked and if it's available you get redirected on all devices.
## Developing

This project (because of its small size) was explicitly built without using a big toolchain.
Libraries are pulled from CDN.

To start testing run
```bash
php -S localhost:8000 -t htdocs/
``` 
### Building

There is no build step needed *yay*

### Deploying / Publishing

Just clone the repo and push the `htdocs` directory to your _internal_ server.

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


