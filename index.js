var Resource = require('deployd/lib/resource');
var exec = require('child_process').exec;
var util = require('util');    
var path = require('path');
var sys = require('sys');
var fs = require('fs');    

function Pdf(name, options) {
    Resource.apply(this, arguments);
}

util.inherits(Pdf, Resource);

module.exports = Pdf;

Pdf.prototype.clientGeneration = true;

Pdf.prototype.handle = function (ctx, next) {
    if (!(ctx.req.body && ctx.req.body['html']))
        return next();
    
    var hash = Math.floor(Math.random() * 1e+32 + 1e+6).toString(36);
    var tmpHtmlPath = path.join('tmp', hash + '.html');
    var tmpPdfPath = path.join('tmp', hash + '.pdf');
    var cmd = ['"' + this.config.path + '"', this.config.options, tmpHtmlPath, tmpPdfPath].join(' ');
    
    fs.mkdir('tmp', function (ex) {
        fs.writeFile(tmpHtmlPath, ctx.req.body['html']);
    
        exec(cmd, function (error, stdout, stderr) {
            fs.unlinkSync(tmpHtmlPath);
            fs.readFile(tmpPdfPath, function(error, content){
                ctx.res.end(content);
                fs.unlinkSync(tmpPdfPath);
            });
        });
    });
};

Pdf.basicDashboard = {
  settings: [
  {
    name        : 'path',
    type        : 'text',
    description : 'Full path to PDF renderer executable'
  }, {
    name        : 'options',
    type        : 'text',
    description : 'PDF renderer command line options'
  }]
};

