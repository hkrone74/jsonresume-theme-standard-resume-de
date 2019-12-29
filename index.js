var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var HandlebarsIntl = require('handlebars-intl')

function render(resume) {
  var css = fs.readFileSync(__dirname + '/style.css', 'utf-8');
  var tpl = fs.readFileSync(__dirname + '/resume.hbs', 'utf-8');
  var partialsDir = path.join(__dirname, 'partials');
  var filenames = fs.readdirSync(partialsDir);
  Handlebars.registerHelper('date', require('helper-date'));
  HandlebarsIntl.registerWith(Handlebars);

  filenames.forEach(function(filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    var name = matches[1];
    var filepath = path.join(partialsDir, filename);
    var template = fs.readFileSync(filepath, 'utf8');
    Handlebars.registerPartial(name, template);
  });

  var intlData = {
      locales: 'de-DE'
  }

  return Handlebars.compile(tpl)({
    css: css,
    resume: resume,
    data: { intl: intlData}
  });
}

module.exports = {
  render: render,
};
