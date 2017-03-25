const _ = require('lodash');


class TestSuite {
    constructor() {
        this.total = 0;
        this.failed = 0;
        this.failures = [];
    }
    assert(assertion, describe=() => '') {
        this.total++;
        if (!assertion) {
            this.failed++;
            const description = describe();
            const localStack = (new Error()).stack.split('\n').slice(2).join('\n');
            this.failures.push(description + '\n' + localStack);
            process.stdout.write('F');
        } else {
            process.stdout.write('.');
        }
    }
    assertEqual(a, b) {
        this.assert(_.isEqual(a, b),
                () => `Not equal:\n> ${a}\n> ${b}`);
    }
    runSuite() {
        console.log('======== Running Tests ========');
        this.run();
        console.log('======== Tests Result  ========');
        if (this.failed) {
            console.log(`FAILED ${this.failed} / ${this.total}`);
            for (const fail_stack of this.failures) {
                console.log(' >>> Stack Trace ');
                console.log(fail_stack);
            }
        } else {
            console.log(`PASSED ${this.total}`);
        }
        console.log('========      DONE     ========');
    }
}


module.exports = TestSuite;
