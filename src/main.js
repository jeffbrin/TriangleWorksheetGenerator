const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;
const MIN_TRIANGLE_SIDE_LENGTH = CANVAS_HEIGHT / 8;
const MAX_TRIANGLE_SIDE_LENGTH = CANVAS_HEIGHT / 1.2;
const NINETY_DEGREE_WIDTH = 20;
const THETA_RADIUS = 25;


/**
 * Adds a canvas with a triangle on it to the body.
 */
function generateTriangle(){
    const canvas = document.createElement("canvas");
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;
    document.body.appendChild(canvas);

    const context = canvas.getContext("2d");
    drawTriangle(context);
}

/**
 * Draws a random triangle through the context.
 * @param {Object} context The context of a canvas to draw a triangle on.
 */
function drawTriangle(context){
    const cornerLeft = Math.random() > 0.5;
    const cornerTop = Math.random() > 0.5;

    const horizontalPadding = 30;
    const verticalPadding = 30;
    const cornerPosition = new Vector2(cornerLeft ? horizontalPadding : CANVAS_WIDTH - horizontalPadding, cornerTop ? verticalPadding : CANVAS_HEIGHT - verticalPadding);

    const side1Length = (MIN_TRIANGLE_SIDE_LENGTH + Math.random() * (MAX_TRIANGLE_SIDE_LENGTH - MIN_TRIANGLE_SIDE_LENGTH));
    const vertex1Position = new Vector2(cornerPosition.x + side1Length * (cornerLeft ? 1 : -1),
                                        cornerPosition.y);
    
    const side2Length = (MIN_TRIANGLE_SIDE_LENGTH + Math.random() * (MAX_TRIANGLE_SIDE_LENGTH - MIN_TRIANGLE_SIDE_LENGTH));
    const vertex2Position = new Vector2(cornerPosition.x,
                                        cornerPosition.y + side2Length * (cornerTop ? 1 : -1));
    
    // Redraw if this triangle is too small
    if (side2Length + side1Length < 150){
        drawTriangle(context);
        return;
    }

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
        triangle = new Triangle(cornerPosition, vertex1Position, side1Length);
        // Find the value of theta
        theta = Math.atan(side2Length / side1Length);
        console.log(theta / Math.PI * 180);

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
        context.fillText("1", thetaArcEnd.x, thetaArcEnd.y)
    }
    else{
        triangle = new Triangle(cornerPosition, vertex2Position, side2Length);
        // Find the value of theta
        theta = Math.atan(side1Length / side2Length);
        console.log(theta / Math.PI * 180);

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
        context.fillText("2", thetaArcEnd.x, thetaArcEnd.y)
    }
    context.stroke();

}

class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Triangle{
    constructor(cornerPosition, thetaVertexPosition, adjecentLength){
        this.cornerPosition = cornerPosition;
        this.thetaVertexPosition = thetaVertexPosition;
        this.adjecentLength = adjecentLength;
    }
}