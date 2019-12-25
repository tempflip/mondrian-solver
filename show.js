const chalk = require('chalk');

const toScreen = (board) => {
    const colors = ['black', 'blue', 'yellow', 'green', 'white', 'pink', 'grey', 'yellow']
    board.forEach(row => {
        row.forEach(pixel => {
            process.stdout.write(chalk.bgKeyword(colors[pixel])('' + pixel + pixel));
        });
        process.stdout.write('\n');
    });

}

module.exports = {
    toScreen : toScreen
};