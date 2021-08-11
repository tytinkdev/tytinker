const BLACKLISTED_KEY_CODES = [38];

const COMMANDS = {
    help: 'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code"> resume</span>, <span class="code">skills</span>, <span class="code"> contact</span>, <span style="color:green"> start game</span>',
    about: "Howdy! 🤠<br>I'm currently a Lead Business Analyst at KeyBank, working on a recommender system and conducting performance analysis. I grew up in Austin, Texas, but now I live in downtown Denver.",
    skills: '<span class="code">Languages:</span> Python, R, HTML, SQL <br><span class="code">Programs:</span> MySQL/PostgreSQL, RStudio, Wireshark, Tableau, Excel<br><span class="code">Other:</span> Kali Linux, AWS, GCP',
    education: '<a href= https://www.colorado.edu/business/ms-programs/masters-program-business-analytics class="header-name" target="_blank">University of Colorado<br><i>M.S. Business Security Analytics</a></i><br>GPA: 3.9 <br><a href= https://www.trinity.edu/academics/departments/economics/economics-ba class="header-name" target="_blank">Trinity University</strong><br><i>B.A. Economics and Business<br></a></i>GPA: 3.1',
    resume: "<a href='Tinker_DS_resume.pdf' class='success link' target='_blank'>resume.pdf</a>",
    experience: '<strong class="header-name">KeyBank (June 2021-Present)</strong><br><strong class="header-name">Broadway Bank (May 2019-August 2019)</strong><br><i>Analyst Intern</i><br><strong class="header-name">Trinity University (May 2016 - August 2020)</strong><br><i>Student Body President</i><br><strong class="header-name">Bureau of Economic Geology (May 2017 - August 2017)</strong><br><i>Economics Intern</i>',
    contact: '<strong class="header-name">e-mail: ✉️ </strong><a href="mailto: tyraytinker@gmail.com" target="_blank">tyraytinker@gmail.com</a><br><strong class="header-name">cell:📱 </strong><a href="tel:512-656-4119"> 512-656-4119</a>',
    'start game': "Welcome to Ty's puzzles! I hope you enjoy the challenge. <i>Please type <span style='color:green'>tutorial</span> to continue.",
    tutorial: "See if you can solve this riddle:<span class='code'><br><i>dog:<b>god</b><br>bad:<b>?</b></i><br></span>If you know the answer, type it below!",
    dab: "Dab on em!<br> As your solve each puzzle, remember that your solution is the key to the next level. Now that you know the rules, you should be ready to go. Good luck!<br>Trust me, I'm as excited as you are.<br><i>Type <span style='color:green'>levelone</span> to continue...<i>",
    levelone: "An ostrich lays the largest eggs of the bird family. <br>How many <span class='code'>rooster eggs</span> fit inside of <span class='code'>1 ostrich egg</span>?<br><i>Answer with a numeric value...</i>",
    0: "You know your birds! Fill in the missing word: A watched pot never... ",
    boils: "You've reached 100 degrees C! Last easy question: <br>What's Ty's instrument of choice?<br><i>Type <span style='color:green'>
    </span> for a hint...<i>",
    piano: "Now you know Ty's favorite instrument, let's check his favorite kind of puzzle! From left to right, top row to bottom row, fill in the missing values in this sudoku challenge:<span class='code'><br><u>_____________</u><br>|2 6 5|4 1 3|<br><u>|_ 4 3|2 5 _|</u><br>|4 5 6|1 3 2|<br><u>|_ 1 2|_ 4 5|</u><br>|5 2 4|3 _ 1|<br><u>|_ 3 1|5 6 _|</u><br><i></span>Do not include any spaces or seperators in your answer. For example; <span style='color:green'>1363522</i> ",
    1636264: "You deserve some hash browns. Speaking of hashes, go ahead and convert your sudoku solution into a SHA1 hash. <br>You can use <span style='color:green'><a href=https://passwordsgenerator.net/sha1-hash-generator/ class='success link' target='_blank'>this site</a></span> to help with your conversion.<br><i>What are the first three characters in the SHA1 hash?</i>",
    d5a: "Nice. According to NIST, SHA1 is the most secure cryptographic hash function available today.<br><i> Is this statement true or false?<i>",
    false: "Precisely! SHA1 was proven to have a collision space too small for effective use in digital certification. <i>Type <span style='color:green'>next</span> to continue...<i>",
    next: "What is the most common password of 2020?",
    123456: "According to nordpass.com, how long would it take to crack this password?",
    'less than a second': "Crazy! To be continued..."
};

let userInput, terminalOutput;

const app = () => {
    userInput = document.getElementById('userInput');
    terminalOutput = document.getElementById('terminalOutput');
    document.getElementById('dummyKeyboard').focus();
    console.log('Application loaded');
};

const execute = function executeCommand(input) {
    let output;
    input = input.toLowerCase();
    if (input.length === 0) {
        return;
    }
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
        1
        output += `<div class="terminal-line">no such command: ${input}</div>`;
        console.log('Oops! no such command');
    } else {
        output += COMMANDS[input];
    }

    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
    const input = userInput.innerHTML;

    if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
        return;
    }

    if (e.key === 'Enter') {
        execute(input);
        userInput.innerHTML = '';
        return;
    }

    userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
    if (e.keyCode !== 8 && e.keyCode !== 46) {
        return;
    }
    userInput.innerHTML = userInput.innerHTML.slice(
        0,
        userInput.innerHTML.length - 1
    );
};

document.addEventListener('keydown', backspace);
document.addEventListener('keypress', key);
document.addEventListener('DOMContentLoaded', app);
