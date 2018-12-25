/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

const StringHelpers = require('../helpers/StringHelpers')
const Mailer = require('../support/Mailer')
const Models = require('../models/index')

// FUNCTIONS

function sendToUsers (subject = '', from = '', site_url = '', text = '', html = '') {
  return Models
    .User.findAll(
      {
        attributes: [
          'id',
          'email',
          'email_validated',
          'first_name',
          'last_name',
          'gender',
          'birth_date'
        ],
        where: {
          enabled: true,
          $and: [
            {
              email: {
                $notLike: '%+%@genial.gt'
              }
            },
            {
              email: {
                $notLike: '%@mhfile.com'
              }
            }
          ]
        }
      })
    .then(users => {
      const list = []

      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        list.push({
          name: user.get('first_name'),
          email: user.get('email')
        })
      }

      return list
    })
    .then(users => {
      batchMail(subject, from, site_url, text, html, users)
    })
    .catch(err => {
      console.log(err)
    })
}

function batchMail (subject = '', from = '', site_url = '', text = '', html = '', users = [], position = 0) {
  let counter = 1

  console.log('----------------------')

  for (let i = position; i < users.length; i++) {
    const user = users[i]
    console.log(user)

    const userText = replaceUser(site_url, user, text)
    const userHTML = replaceUser(site_url, user, html)
    Mailer.sendTo(user.name, user.email, subject, userText, userHTML, from)

    counter++
    if (counter > 5) {
      setTimeout(function () { batchMail(subject, from, site_url, text, html, users, i + 1) }, 1000)
      break
    }
  }
}

function replaceUser (site_url = '', user = {}, text = '') {
  const name = user.name || ''
  const email = user.email || ''

  text = StringHelpers.replaceAll(text, '{{ site_url }}', site_url)
  text = StringHelpers.replaceAll(text, '{{ name }}', name)
  text = StringHelpers.replaceAll(text, '{{ email }}', email)

  return text
}

// RUN

const subject = 'Danos tu opinión'

const from = `"Bancored" <info@bancored.com>`

const siteURL = 'https://www.mhfile.com'

let text = fs.readFileSync(path.join(__dirname, '/../mails/20171129/thanks.txt'), 'utf8')

let html = fs.readFileSync(path.join(__dirname, '/../mails/20171129/thanks.html'), 'utf8')

sendToUsers(subject, from, siteURL, text, html)
