const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 500;
const MIN_TRIANGLE_SIDE_LENGTH = CANVAS_WIDTH / 6 / 1.9;
const MAX_TRIANGLE_SIDE_LENGTH = CANVAS_WIDTH / 1.9;
const NINETY_DEGREE_WIDTH = 10;
const THETA_RADIUS = 25;
const MEASUREMENT = "cm";
const INT_VALUES_ONLY = true;

const form = document.getElementById('worksheet-info-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate the form
    const formError = validateForm()

    if (formError){
        alert(formError);
        return;
    }

    const numberOfProblemsPerFunction = document.getElementById('problems-quantity-input').value;
    const sinProblems = document.getElementById('sin-checkbox').checked; 
    const cosProblems = document.getElementById('cos-checkbox').checked; 
    const tanProblems = document.getElementById('tan-checkbox').checked; 

    let questionNumber = 1;
    if(sinProblems)
        for(let i = 0; i < numberOfProblemsPerFunction; i++){
            let params = {questionNumber: questionNumber};
            if(randomChanceOfSuccess(33))
                params.findHypotenuse = true;
            else if(randomChanceOfSuccess(33))
                params.findOpposite = true;
            else
                params.findTheta = true;
            generateSinProblem(params)
            questionNumber++;
        }
    if(cosProblems)
        for(let i = 0; i < numberOfProblemsPerFunction; i++){
            let params = {questionNumber: questionNumber};
            if(randomChanceOfSuccess(33))
                params.findHypotenuse = true;
            else if(randomChanceOfSuccess(33))
                params.findAdjacent = true;
            else
                params.findTheta = true;
            generateCosProblem(params)
            questionNumber++;
        }
    if(tanProblems)
        for(let i = 0; i < numberOfProblemsPerFunction; i++){
            let params = {questionNumber: questionNumber};
            if(randomChanceOfSuccess(33))
                params.findOpposite = true;
            else if(randomChanceOfSuccess(33))
                params.findAdjacent = true;
            else
                params.findTheta = true;
            generateTanProblem(params)
            questionNumber++;
        }
                



})

/**
 * Validates the form to make sure it's all full and returns a string indicating any error.
 */
function validateForm(){
    
    let errorString = '';
    if(![...document.getElementsByClassName('function-checkbox')].some(box => box.checked))
        errorString += 'Please select at least one trig function to make questions for.\n'

    return errorString;

}

/**
 * Generates a problem which is solved by using tangent.
 * @param {object} params An object containing parameters for the problem.
 */
function generateTanProblem(params){

    const problemDiv = document.createElement("div");
    problemDiv.className = "problemDiv";

    let problemDescription = `${params.questionNumber}. `;
    if (params.findTheta){
        var {canvas, triangle} = generateTriangleCanvas(false, true, true, false, true);
        problemDescription += `A right angle triangle has one side measuring ${triangle.oppositeLength}${MEASUREMENT} and another measuring ${triangle.adjacentLength}${MEASUREMENT}.` +
                             `What is the the angle of theta?`;
    }
    else if (params.findOpposite){
        var {canvas, triangle} = generateTriangleCanvas(true, false, true, false, false, true);
        problemDescription += `A right angle triangle has an angle theta measuring ${triangle.theta}° and an adjacent side measuring ${triangle.adjacentLength}${MEASUREMENT}. What is the length of the opposite side?`
    }
    else if (params.findAdjacent){
            var {canvas, triangle} = generateTriangleCanvas(true, true, false, false, false, false, true);
        problemDescription += `A right angle triangle has an angle theta measuring ${triangle.theta}° and an opposite side measuring ${triangle.oppositeLength}${MEASUREMENT}. What is the length of the adjacent side?`;
    }

    const questionText = document.createElement("p");
    questionText.innerText = problemDescription;

    problemDiv.appendChild(questionText);
    problemDiv.appendChild(canvas);

    document.body.appendChild(problemDiv);

}

/**
 * Generates a problem which is solved by using cosine.
 * @param {object} params An object containing parameters for the problem.
 */
function generateCosProblem(params){
    const problemDiv = document.createElement("div");
    problemDiv.className = "problemDiv";

    let problemDescription = `${params.questionNumber}. `;
    if (params.findTheta){
        var {canvas, triangle} = generateTriangleCanvas(false, false, true, true, true);
        problemDescription += `A right angle triangle has an angle theta who's adjacent side measures ${triangle.adjacentLength}${MEASUREMENT} and a hypotenuse measuring ${triangle.hypotenuseLength}${MEASUREMENT}.` +
                             `What is the the angle of theta?`;
    }
    else if (params.findHypotenuse){
        var {canvas, triangle} = generateTriangleCanvas(true, false, true, false, false, false, false, true);
        problemDescription += `A right angle triangle has an angle theta measuring ${triangle.theta}° and an adjacent side measuring ${triangle.adjacentLength}${MEASUREMENT}. What is the length of the hypotenuse?`
    }
    else if (params.findAdjacent){
            var {canvas, triangle} = generateTriangleCanvas(true, false, false, true, false, false, true);
        problemDescription += `A right angle triangle has an angle theta measuring ${triangle.theta}° and a hypotenuse measuring ${triangle.hypotenuseLength}${MEASUREMENT}. What is the length of the adjacent side?`;
    }

    const questionText = document.createElement("p");
    questionText.innerText = problemDescription;

    problemDiv.appendChild(questionText);
    problemDiv.appendChild(canvas);

    document.body.appendChild(problemDiv);
}

/**
 * Generates a problem which is solved by using sine.
 * @param {object} params An object containing parameters for the problem.
 */
function generateSinProblem(params){
    const problemDiv = document.createElement("div");
    problemDiv.className = "problemDiv";

    let problemDescription = `${params.questionNumber}. `;
    if (params.findTheta){
        var {canvas, triangle} = generateTriangleCanvas(false, true, false, true, true);
        problemDescription += `A right angle triangle has an angle theta who's opposite side measures ${triangle.oppositeLength}${MEASUREMENT} and a hypotenuse measuring ${triangle.hypotenuseLength}${MEASUREMENT}.` +
                             `What is the the angle of theta?`;
    }
    else if (params.findHypotenuse){
        var {canvas, triangle} = generateTriangleCanvas(true, true, false, false, false, false, false, true);
        problemDescription += `A right angle triangle has an angle theta measuring ${triangle.theta}° and an opposite side measuring ${triangle.oppositeLength}${MEASUREMENT}. What is the length of the hypotenuse?`
    }
    else if (params.findOpposite){
            var {canvas, triangle} = generateTriangleCanvas(true, false, false, true, false, true);
        problemDescription += `A right angle triangle has an angle theta measuring ${triangle.theta}° and a hypotenuse measuring ${triangle.hypotenuseLength}${MEASUREMENT}. What is the length of the opposite side?`;
    }

    const questionText = document.createElement("p");
    questionText.innerText = problemDescription;

    problemDiv.appendChild(questionText);
    problemDiv.appendChild(canvas);

    document.body.appendChild(problemDiv);
}

/**
 * Adds a canvas with a triangle on it to the body.
 * @return {object} An object with a canvas attribute and a triangle attribute. Ex. {'canvas': canvas, 'triangle': triangle}
 */
function generateTriangleCanvas(showThetaAngle = true, showOppositeLength = true, showAdjacentLength = true, showHypotenuseLength = true,
    findingTheta = false, findingOpposite = false, findingAdjacent = false, findingHypotenuse = false){
    const canvas = document.createElement("canvas");
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;

    const context = canvas.getContext("2d");
    const triangle = drawTriangle(context, showThetaAngle, showOppositeLength, showAdjacentLength, showHypotenuseLength, findingTheta, findingOpposite, findingAdjacent, findingHypotenuse);

    return {canvas, triangle};
}

/**
 * Draws a random triangle through the context.
 * @param {Object} context The context of a canvas to draw a triangle on.
 * @return {Triangle} A triangle object that was drawn.
 */
function drawTriangle(context, showThetaAngle = true, showOppositeLength = true, showAdjacentLength = true, showHypotenuseLength = true,
    findingTheta = false, findingOpposite = false, findingAdjacent = false, findingHypotenuse = false){
    const cornerLeft = Math.random() > 0.5;
    const cornerTop = Math.random() > 0.5;

    const horizontalPadding = 60;
    const verticalPadding = 30;
    const cornerPosition = new Vector2(cornerLeft ? horizontalPadding : CANVAS_WIDTH - horizontalPadding, cornerTop ? verticalPadding : CANVAS_HEIGHT - verticalPadding);

    const side1Length = (MIN_TRIANGLE_SIDE_LENGTH + Math.random() * (MAX_TRIANGLE_SIDE_LENGTH - MIN_TRIANGLE_SIDE_LENGTH));
    const vertex1Position = new Vector2(cornerPosition.x + side1Length * (cornerLeft ? 1 : -1),
                                        cornerPosition.y);
    
    const side2Length = (MIN_TRIANGLE_SIDE_LENGTH + Math.random() * (MAX_TRIANGLE_SIDE_LENGTH - MIN_TRIANGLE_SIDE_LENGTH));
    const vertex2Position = new Vector2(cornerPosition.x,
                                        cornerPosition.y + side2Length * (cornerTop ? 1 : -1));
    
    // Redraw if this triangle is too small
    if (side2Length + side1Length < 150)
        return drawTriangle(context);

    // Draw the triangle
    context.beginPath();
    context.moveTo(cornerPosition.x, cornerPosition.y);
    context.lineTo(vertex1Position.x, vertex1Position.y);
    context.lineTo(vertex2Position.x, vertex2Position.y);
    context.lineTo(cornerPosition.x, cornerPosition.y);
    context.stroke();

    // Draw the 90 degree angle
    const degreePosition = new Vector2(cornerPosition.x - (cornerLeft ? 0 : NINETY_DEGREE_WIDTH),
                                       cornerPosition.y - (cornerTop ? 0 : NINETY_DEGREE_WIDTH));
    context.strokeRect(degreePosition.x, degreePosition.y, NINETY_DEGREE_WIDTH, NINETY_DEGREE_WIDTH);

    // Draw theta angle
    // Pick a random vertex for the theta angle
    let triangle;
    let theta;
    if (Math.random() > 0){
        
        // Find the value of theta
        theta = Math.atan(side2Length / side1Length);
        triangle = new Triangle(cornerPosition, vertex1Position, side1Length, side2Length, Math.sqrt(Math.pow(side1Length, 2) + Math.pow(side2Length, 2)), theta / Math.PI * 180);

        // Find the end location of theta on the hypotenuse
        const smallAdjacent = Math.cos(theta) * THETA_RADIUS * (cornerLeft ? -1 : 1)
        const smallOpposite = Math.sin(theta) * THETA_RADIUS * (cornerTop ? 1 : -1)
        const thetaArcEnd = new Vector2(
            vertex1Position.x + smallAdjacent, 
            vertex1Position.y + smallOpposite)

        context.moveTo(vertex1Position.x + THETA_RADIUS * (cornerLeft ? -1 : 1), vertex1Position.y);
        context.quadraticCurveTo(
            vertex1Position.x + THETA_RADIUS * (cornerLeft ? -1 : 1),  
            thetaArcEnd.y - smallOpposite / 2,
            thetaArcEnd.x, 
            thetaArcEnd.y);


        // Write the lengths and stuff
        context.font = context.font.replace(/\d+px/, "14px");;
        const adjacentWritingPosition = new Vector2((vertex1Position.x + cornerPosition.x) / 2 - 15, cornerPosition.y + (cornerTop ? -5 : 20))
        if (showAdjacentLength)
            context.fillText(`${triangle.adjacentLength}${MEASUREMENT}`, adjacentWritingPosition.x, adjacentWritingPosition.y);
        else if (findingAdjacent)
            context.fillText(`x`, adjacentWritingPosition.x, adjacentWritingPosition.y);

        const oppositeWritingPosition = new Vector2(cornerPosition.x + (cornerLeft ? -45 : 5), (vertex2Position.y + cornerPosition.y) / 2 - 7)
        if (showOppositeLength)
            context.fillText(`${triangle.oppositeLength}${MEASUREMENT}`, oppositeWritingPosition.x, oppositeWritingPosition.y);
        else if (findingOpposite)
            context.fillText(`x`, oppositeWritingPosition.x + (cornerLeft ? 20 : 0), oppositeWritingPosition.y);

        const thetaWritingPosition = new Vector2(vertex1Position.x + (cornerLeft ? 2 : -20), vertex1Position.y + (cornerTop ? -7 : 2))
        if (showThetaAngle)
            context.fillText(`${triangle.theta}°`, thetaWritingPosition.x, thetaWritingPosition.y);
        else if (findingTheta)
            context.fillText(`θ`, thetaWritingPosition.x, thetaWritingPosition.y);

        const hypotenuseWritingPosition = new Vector2((vertex1Position.x + vertex2Position.x) / 2 + (cornerLeft ? 10 : -40), (vertex1Position.y + vertex2Position.y) / 2 + (cornerTop ? 20 : -10));
        if (showHypotenuseLength)
            context.fillText(`${triangle.hypotenuseLength}${MEASUREMENT}`, hypotenuseWritingPosition.x, hypotenuseWritingPosition.y);
        else if (findingHypotenuse)
            context.fillText(`x`, hypotenuseWritingPosition.x + (cornerLeft ? 0 : 10), hypotenuseWritingPosition.y);
    }
    else{
         // Find the value of theta
         theta = Math.atan(side1Length / side2Length);
        triangle = new Triangle(cornerPosition, vertex2Position, side2Length, side1Length, Math.sqrt(Math.pow(side1Length, 2) + Math.pow(side2Length, 2)), theta / Math.PI * 180);

        // Find the end location of theta on the hypotenuse
        const smallAdjacent = Math.cos(theta) * THETA_RADIUS * (cornerTop ? -1 : 1)
        const smallOpposite = Math.sin(theta) * THETA_RADIUS * (cornerLeft ? 1 : -1)
        const thetaArcEnd = new Vector2(
            vertex2Position.x + smallOpposite, 
            vertex2Position.y + smallAdjacent)

        context.moveTo(vertex2Position.x, vertex2Position.y + THETA_RADIUS * (cornerTop ? -1 : 1));
        context.quadraticCurveTo(
            vertex2Position.x + smallOpposite / 2 * (cornerLeft ? 1 : 1),  
            vertex2Position.y + THETA_RADIUS * (cornerTop ? -1 : 1),
            thetaArcEnd.x, 
            thetaArcEnd.y);
    }
    context.stroke();

    return triangle

}

class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Triangle{
    constructor(cornerPosition, thetaVertexPosition, adjacentLength, oppositeLength, hypotenuseLength, theta){
        this.cornerPosition = INT_VALUES_ONLY ? Math.round(cornerPosition) : Math.round(cornerPosition * 100) / 100;
        this.thetaVertexPosition = INT_VALUES_ONLY ? Math.round(thetaVertexPosition) : Math.round(thetaVertexPosition * 100) / 100;
        this.adjacentLength = INT_VALUES_ONLY ? Math.round(adjacentLength) : Math.round(adjacentLength * 100) / 100;
        this.oppositeLength = INT_VALUES_ONLY ? Math.round(oppositeLength) : Math.round(oppositeLength * 100) / 100;
        this.hypotenuseLength = INT_VALUES_ONLY ? Math.round(hypotenuseLength) : Math.round(hypotenuseLength * 100) / 100;
        this.theta = INT_VALUES_ONLY ? Math.round(theta) : Math.round(theta * 100) / 100;;
    }
}

/**
 * Returns true or false based on a random chance.
 * @param {Number} percentChance A number between 0 and 100 representing the likelihood that this function returns true.
 * @returns True percentChance percent of the time, false otherwise.
 */
function randomChanceOfSuccess(percentChance){
    return Math.random() < percentChance / 100;
}