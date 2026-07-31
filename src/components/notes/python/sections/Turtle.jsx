// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    Pencil,
    Monitor,
    Move,
    Palette,
    Circle,
    MousePointer2,
    Repeat,
    Layers,
    ListChecks,
    Star,
    Flag,
    Lightbulb,
    AlertTriangle,
    Hexagon
} from "lucide-react";

const Turtle = () => {
    const summaryHeaders = ["Function", "Action", "Example"];
    const summaryRows = [
        [<code>forward(d)</code>, "Move forward by 'd' pixels", <code>t.forward(100)</code>],
        [<code>backward(d)</code>, "Move backward by 'd' pixels", <code>t.backward(50)</code>],
        [<code>right(angle)</code>, "Turn right by given angle", <code>t.right(90)</code>],
        [<code>left(angle)</code>, "Turn left by given angle", <code>t.left(45)</code>],
        [<code>penup()</code>, "Lift pen (stop drawing)", <code>t.penup()</code>],
        [<code>pendown()</code>, "Put pen down (start drawing)", <code>t.pendown()</code>],
        [<code>color("name")</code>, "Change pen and fill color", <code>t.color("red")</code>],
        [<code>begin_fill()</code>, "Start filling a shape", <code>t.begin_fill()</code>],
        [<code>end_fill()</code>, "End filling a shape", <code>t.end_fill()</code>],
        [<code>circle(r)</code>, "Draw a circle of radius 'r'", <code>t.circle(50)</code>],
    ];

    return (
        <section id="turtle" className="scroll-mt-20 space-y-6">
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-green-600 to-teal-600 p-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <Pencil className="w-8 h-8" /> Turtle Graphics
                </h1>
                <p className="text-green-50 mt-1 text-sm">
                    A fun way to learn programming by drawing pictures and shapes.
                </p>
            </div>

            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    The <strong>turtle</strong> module is a pre-installed Python library that provides a virtual canvas.
                    Imagine a robotic turtle holding a pen in the center of the screen. By writing Python commands,
                    you can direct the turtle to move around and draw beautiful shapes, patterns, and pictures!
                </p>
            </div>

            <div className="space-y-5">
                <h2 className="text-xl font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
                    <ListChecks className="w-5 h-5" /> Turtle Basics — Step by Step
                </h2>

                {/* 1. Setup */}
                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-setup">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <Monitor className="w-5 h-5" /> 1. Getting Started & Setup
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        To use turtle graphics, you must first <strong>import</strong> the module.
                        Then, create a screen and a turtle object to control.
                    </p>
                    <CodeBlock code={`import turtle

# Create the screen (the canvas)
screen = turtle.Screen()
screen.bgcolor("white") # Set background color
screen.title("My First Turtle Drawing")

# Create a turtle named 't'
t = turtle.Turtle()
t.shape("turtle") # Changes the pointer to look like a turtle!

# Keep the window open until you click it
screen.exitonclick()`} />
                </div>

                {/* 2. Movement */}
                <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-movement">
                    <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                        <Move className="w-5 h-5" /> 2. Moving and Turning
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        You can move the turtle forward and backward (by pixels), and turn it left or right (by degrees).
                    </p>
                    <CodeBlock code={`import turtle
t = turtle.Turtle()

# Move forward 100 pixels
t.forward(100)

# Turn right by 90 degrees
t.right(90)

# Move forward 50 pixels
t.forward(50)

# Turn left by 45 degrees
t.left(45)

# Move backward 50 pixels
t.backward(50)`} />
                    <Infobox type="info" title="Shorthand Commands">
                        You can use abbreviations: <code>fd()</code> for forward, <code>bk()</code> for backward,
                        <code>rt()</code> for right, and <code>lt()</code> for left.
                    </Infobox>
                </div>

                {/* 3. Pen Control */}
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-pen">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <MousePointer2 className="w-5 h-5" /> 3. Pen Control
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Sometimes you want to move the turtle <strong>without</strong> drawing a line.
                        You can "lift" the pen up, and put it back down later. You can also change the thickness and speed.
                    </p>
                    <CodeBlock code={`import turtle
t = turtle.Turtle()

t.pensize(5)    # Make the line thicker
t.speed(1)      # Slowest speed (1-10, 0 is fastest)

t.forward(100)  # Draws a line

t.penup()       # Lift the pen!
t.forward(50)   # Moves, but leaves NO line

t.pendown()     # Put the pen back down
t.forward(100)  # Draws a line again`} />
                </div>

                {/* 4. Shapes and Drawing */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-shapes">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <Circle className="w-5 h-5" /> 4. Drawing Shapes
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        The turtle can draw perfect circles and dots automatically. For other shapes like squares and rectangles, it's best to create reusable <strong>functions</strong>.
                    </p>
                    <CodeBlock code={`import turtle
t = turtle.Turtle()

# 1. Circle, Arc, and Dot
t.circle(50)         # Draw a circle with radius 50
t.circle(100, 180)   # Draw a semicircle (180 degrees)
t.dot(20)            # Draw a solid dot of diameter 20

t.penup()
t.goto(-100, -100)
t.pendown()

# 2. Square using a function
def draw_square(size):
    for _ in range(4):
        t.forward(size)
        t.right(90)

draw_square(60)

# 3. Rectangle using a function
def draw_rectangle(length, width):
    for i in range(4):
        if i % 2 == 0:
            t.forward(length)
        else:
            t.forward(width)
        t.right(90)

draw_rectangle(150, 80)

# 4. Triangle using a function
def draw_triangle(size):
    for _ in range(3):
        t.forward(size)
        t.left(120)

draw_triangle(100)`} />
                </div>

                {/* 5. Colors and Filling */}
                <div className="rounded-xl border-2 border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-colors">
                    <h3 className="text-lg font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2">
                        <Palette className="w-5 h-5" /> 5. Colors and Filling
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Make your drawings vibrant! You can change the pen color, the background color,
                        and even fill shapes with solid colors.
                    </p>
                    <CodeBlock code={`import turtle
t = turtle.Turtle()

# Change pen color to red
t.pencolor("red")
t.pensize(3)

# Change fill color to yellow
t.fillcolor("yellow")

# Start filling
t.begin_fill()

# Draw a circle
t.circle(60)

# Stop filling (completes the yellow circle)
t.end_fill()`} />
                </div>

                {/* 6. Loops */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-loops">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <Repeat className="w-5 h-5" /> 6. Drawing with Loops
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Instead of repeating lines of code, use a <strong>for loop</strong>!
                        This is the true power of programming with turtle. Let's draw a star and a complex pattern.
                    </p>
                    <CodeBlock code={`import turtle
t = turtle.Turtle()
t.speed(5)
t.color("blue")

# Draw a square using a loop
for i in range(4):
    t.forward(100)
    t.right(90)

t.penup()
t.goto(-150, 0)  # Move to a new starting coordinate
t.pendown()

# Draw a 5-pointed star
t.color("gold")
t.begin_fill()
for i in range(5):
    t.forward(100)
    t.right(144)  # 144 degrees makes a star!
t.end_fill()

turtle.done()  # Same as screen.exitonclick()`} />
                </div>

                {/* 7. Advanced Polygons */}
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-advanced">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                        <Hexagon className="w-5 h-5" /> 7. Advanced Polygons & Patterns
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        By doing a little math, you can write a function to draw <em>any</em> regular polygon or complex star. Here's how to calculate the angles dynamically and draw a cool spiral!
                    </p>
                    <CodeBlock code={`import turtle
t = turtle.Turtle()
t.speed(0) # Fastest speed

# Draw any regular polygon
def draw_polygon(sides, size):
    angle = 360 / sides
    for _ in range(sides):
        t.forward(size)
        t.right(angle)

draw_polygon(5, 80) # Pentagon
draw_polygon(8, 50) # Octagon

t.penup()
t.goto(100, 100)
t.pendown()

# Advanced: Colorful Spiral
colors = ["red", "purple", "blue", "green", "orange", "yellow"]
for x in range(100):
    t.pencolor(colors[x % 6])
    t.width(x / 100 + 1)
    t.forward(x)
    t.left(59)

turtle.done()`} />
                </div>

                {/* 8. Practical Example: USA Flag */}
                <div className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="turtle-flag">
                    <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
                        <Flag className="w-5 h-5" /> 8. Practical Example: USA Flag
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Let's put our skills to work by drawing a simplified version of the American flag! This combines loops, functions, colors, and precise movements.
                    </p>
                    <CodeBlock code={`import turtle

screen = turtle.Screen()
screen.setup(width=600, height=400)
t = turtle.Turtle()
t.speed(0)

def draw_rectangle(width, height, color):
    t.fillcolor(color)
    t.begin_fill()
    for _ in range(2):
        t.forward(width)
        t.right(90)
        t.forward(height)
        t.right(90)
    t.end_fill()

def draw_star(size, color):
    t.fillcolor(color)
    t.pencolor(color)
    t.begin_fill()
    for _ in range(5):
        t.forward(size)
        t.right(144)
    t.end_fill()

# Draw red and white stripes
stripe_height = 400 / 13
t.penup()
t.goto(-300, 200)
for i in range(13):
    t.pendown()
    color = "red" if i % 2 == 0 else "white"
    draw_rectangle(600, stripe_height, color)
    t.penup()
    t.goto(-300, 200 - (i + 1) * stripe_height)

# Draw blue canton (rectangle)
t.goto(-300, 200)
t.pendown()
draw_rectangle(240, stripe_height * 7, "darkblue")

# Draw stars (simplified 4x5 grid)
t.penup()
for row in range(4):
    for col in range(5):
        t.goto(-280 + col * 45, 175 - row * 35)
        t.pendown()
        draw_star(15, "white")
        t.penup()

t.hideturtle()
turtle.done()`} />
                </div>

                {/* 9. Tips & Troubleshooting */}
                <div className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-slate-800 p-5 space-y-4 shadow-sm" id="turtle-tips">
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" /> 9. Tips & Troubleshooting
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                                <ListChecks className="w-4 h-4" /> Best Practices
                            </h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-350 space-y-1">
                                <li><strong>Use functions:</strong> Organize your code into reusable functions for each shape.</li>
                                <li><strong>Control the pen:</strong> Use <code>penup()</code> and <code>pendown()</code> to move without drawing.</li>
                                <li><strong>Positioning:</strong> Use <code>goto(x, y)</code> to teleport to specific coordinates.</li>
                                <li><strong>Hide turtle:</strong> Use <code>hideturtle()</code> when finished for a cleaner look.</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                            <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Common Issues
                            </h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-350 space-y-1">
                                <li><strong>Screen closes instantly:</strong> Add <code>turtle.done()</code> or <code>screen.exitonclick()</code> at the end.</li>
                                <li><strong>Too slow or fast:</strong> Adjust speed with <code>t.speed()</code> (1-10, or 0 for fastest).</li>
                                <li><strong>Drawing off-screen:</strong> Use <code>screen.setup(width, height)</code> to set an appropriate window size.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Summary table */}
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Turtle Quick Reference
                    </h4>
                    <NoteTable headers={summaryHeaders} rows={summaryRows} />
                </div>
            </div>
        </section>
    );
};

export default Turtle;
