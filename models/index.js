var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    title: { type: Sequelize.STRING, allowNull: false },
    urlTitle: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.TEXT, allowNull: false },
    status: Sequelize.ENUM('open', 'closed'),
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    getterMethods: {
        route: function() {
            return '/wiki/' + this.urlTitle;
        }
    },
        
    hooks: {
        beforeValidate: function(page, options) {
            page.urlTitle = page.title.replace(/ /g, "_").replace(/[^\w\s]/gi, '');
        }
    }
});

var User = db.define('user', {
    name: { type: Sequelize.STRING, allowNull: false },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true }
    }
});

module.exports = {
    db: db,
    Page: Page,
    User: User
};
