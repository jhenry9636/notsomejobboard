var _ = require('lodash');
var faker = require('faker');

function getRandomTech() {
  var skills = ['HTML',
    'HTML4',
    'HTML5',
    'CSS 3',
    'Javascript',
    'Ajax',
    'jQuery',
    'Bootstrap',
    'Foundation',
    'React',
    'Flux',
    'W3C',
    'UX / Usability',
    'Website Performance',
    'Website Optimization',
    'Modernizr',
    'ECMAScript 6',
    'Browserify',
    'Mocha',
    'QUnit',
    'JSLint',
    'Sass',
    'Less',
    'Stylus',
    'Git',
    'Github',
    'Subversion',
    'Canvas',
    'Geolocation',
    'Video',
    'Accessibility',
    'Yeoman',
    'Grunt',
    'Gulp',
    'Make',
    'SASS',
    'LESS',
    'Stylus',
    'Web Workers']

  return _.sampleSize(skills, 6)

}

function getRandomCompType() {
  return _.sampleSize(['fulltime', 'contract'], 1)[0]
}

function getRandomCompMin(compType) {
  var compMinArr = {
    fulltime: [
      '70000',
      '75000',
      '80000',
      '90000',
      '100000',
      '110000',
      '115000',
      '120000',
      '125000',
      '130000',
      '135000',
      '140000',
      '145000',
      '150000',
      '155000',
      '160000',
      '165000',
      '170000'
    ],
    contract: [
      '60',
      '65',
      '70',
      '75',
      '80',
      '85',
      '90',
      '95',
      '100',
      '110',
      '115',
      '120',
      '125',
      '130',
      '135'
    ]
  }[compType];

  return _.sampleSize(compMinArr, 1)[0]
}

exports.getRandomRecruiter = function(count) {
  var arr = [];

  var firstName = faker.name.firstName();
  var lastName = faker.name.lastName();

  while(count) {
    var obj = {};

    obj.givenName = firstName;
    obj.familyName = lastName;
    obj.primaryEmail = faker.internet.email();
    obj.primaryPhone = faker.phone.phoneNumber();
    obj.password = '123456';
    obj.companyName = faker.company.companyName();
    obj.companyCity = faker.address.city();
    obj.companyState = faker.address.stateAbbr();
    obj.companyZip = faker.address.zipCode();
    obj.companyAddress1 = faker.address.streetAddress();
    obj.companyAddress2 = faker.address.secondaryAddress();
    obj.hasVerifiedEmail = true;

    arr.push(obj)
    count-=1
  }
  
  return arr
}


exports.getRandomDeveloper = function(count) {
  var arr = [];

  function setCompMinAndCompType(obj) {
    var compTyp = getRandomCompType();
    obj.compType = compTyp;
    obj.compMin = getRandomCompMin(compTyp);
  }

  while(count) {
    var obj = {};

    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();

    obj.givenName = firstName;
    obj.familyName = lastName;
    obj.primaryEmail = firstName+'.'+faker.internet.email();
    obj.password = '123456';
    obj.primaryPhone = faker.phone.phoneNumber();
    obj.hasVerifiedEmail = true;
    obj.technologies = getRandomTech()

    setCompMinAndCompType(obj)
    arr.push(obj)
    count-=1
  }

  return arr
}

exports.getRandomRequest = function(count, recruiterIds, developerIds) {
  var arr = [];
  

  while(count) {
    var obj = {};

    var compType = getRandomCompType();
    var compMax = getRandomCompMin(compType)

    obj.sender = _.sampleSize(recruiterIds, 1)[0]
    obj.recipient = _.sampleSize(developerIds, 1)[0]
    obj.location = _.sampleSize(developerIds, 1)[0]
    obj.compType = compType
    obj.compMax = compMax
    obj.technologies = getRandomTech();
    obj.clientName = _.sampleSize([faker.company.companyName(), ''], 1)[0]

    arr.push(obj)

    count-=1
  }

  return arr
}