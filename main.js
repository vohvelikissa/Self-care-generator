Colors = {
    hueForGeneration: Math.random(),
    hsvToRgb(h, s, v) {
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
        }

        return [r * 255, g * 255, b * 255];
    },
    randomHSVColor() {
        const goldenRatioConjugate = Math.PI / 2 + 0.618033988749895;
        this.hueForGeneration += goldenRatioConjugate;
        const hue = this.hueForGeneration % 1;
        const saturation = 0.4 + 0.4 * Math.random();
        const value = 0.7 + Math.random() / 10;
        return [hue, saturation, value];
    },
    randomRGBColor() {
        return this.hsvToRgb(...this.randomHSVColor());
    },
};

class Options {
    constructor(configuration) {
        this.configuration = configuration;
    }

    getRandomGroundingTechnique() {
        const techniques = this.configuration.grounding;
        return this.getRandom(techniques);
    }

    getRandomRecoveryTechnique() {
        const techniques = this.configuration.recovery;
        return this.getRandom(techniques);
    }

    getRandomCareTechnique() {
        const techniques = this.configuration.care;
        return this.getRandom(techniques);
    }

    getRandom(fromArray) {
        return fromArray[Math.floor(Math.random() * fromArray.length)];
    }
}

function renderTechnique(technique) {
    const text = technique.text;
    const color = technique.color;
    technique.element.innerHTML = `<p>${text}</p>`;

    technique.element.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
}

async function main() {
    const configuration = {
        grounding: [
            "Listen to music",
            "Sing along to your favorite song",
            "Do some yoga",
            "Go for a walk",
            "Stretch your muscles",
            "Go for a run",
            "Cycle for a bit",
            "Practice dancing",
            "Find a thing with a scent and smell it",
            "Count 5 things you see, then hear, feel, and smell",
            "Do physical exercise",
            "Write a diary entry",
            "Write a short story",
            "Follow an exercise video",
            "Knit / Sew / Crochet",
            "Drink one of your favorite beverages",
            "Watch or play some sports",
            "Do a breathing exercise",
            "Listen to calming music",
        ],
        recovery: [
            "Watch an old favorite movie",
            "Meditate",
            "Cook something for yourself",
            "Bake something for yourself",
            "Watch your favorite TV-show",
            "Watch a new movie",
            "Read a chapter of a book / Find a new book",
            "Study a subject you love",
            "Spend time in nature",
            "Make a scrapbook page",
            "Do puzzles / brain games",
            "Craft something",
            "Play a video game",
            "Do a compassion exercise",
            "Make a fitting music mix",
            "Color a coloring book / picture",
        ],
        care: [
            "Take care of your nails",
            "Take care of the skin on your face",
            "Stretch your eye muscles by looking far",
            "Do some stretches",
            "Take a bath or shower",
            "Take care of your skin",
            "Spend time with your pet / virtual pet",
            "Pamper yourself",
            "Do some gardening",
            "Light a candle that smells good",
            "Spend time with / call your friends",
            "Eat something replenishing",
            "Drink some tea",
            "Take a nap",
            "Take care of your oral hygiene",
            "Use some lip balm",
            "Take care of your hair",
            "Take care of your surroundings",
            "Clean your working area",
            "Listen to some comedy",
            "Make sure you stay hydrated",
        ],
    };

    const options = new Options(configuration);

    const careTechniques = [
        {
            element: document.getElementById("grounding"),
            text: options.getRandomGroundingTechnique(),
            color: Colors.randomRGBColor(),
        },
        {
            element: document.getElementById("recovery"),
            text: options.getRandomRecoveryTechnique(),
            color: Colors.randomRGBColor(),
        },
        {
            element: document.getElementById("care"),
            text: options.getRandomCareTechnique(),
            color: Colors.randomRGBColor(),
        },
    ];

    for (technique of careTechniques) {
        renderTechnique(technique);
    }
}
main();
