# Deployd PDF Rendering Resource

This custom resource type allows you to render html to PDF. It requires an
external command line utility like [wkhtml](https://code.google.com/p/wkhtmltopdf/).

## Installation

`$ npm install dpd-pdf`

See [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.

## Configuration

Before using the pdf resource, you must go to its Dashboard page and configure it.

### Required settings:

**path**  
Full path to PDF renderer executable.

### Optional settings:

**options**  
PDF renderer command line options.
