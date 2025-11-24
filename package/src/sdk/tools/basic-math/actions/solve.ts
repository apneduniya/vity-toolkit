import { z } from "zod";
import { createAction } from "../../../helpers/createAction";
import { toolMessage } from "../../../helpers/common";

const mathOperations = {
    add: (numbers: number[]) => numbers.reduce((acc, value) => acc + value, 0),
    subtract: (numbers: number[]) => numbers.reduce((acc, value) => acc - value),
    multiply: (numbers: number[]) => numbers.reduce((acc, value) => acc * value, 1),
    divide: (numbers: number[]) => numbers.reduce((acc, value) => acc / value),
    average: (numbers: number[]) => numbers.reduce((acc, value) => acc + value, 0) / numbers.length,
    min: (numbers: number[]) => Math.min(...numbers),
    max: (numbers: number[]) => Math.max(...numbers),
};

type Operation = keyof typeof mathOperations;

const basicMathSolve = async (inputParams: { operation: Operation, numbers: number[] }) => {
    try {
        const { operation, numbers } = inputParams;

        if (numbers.length === 0) {
            throw new Error("Provide at least one number.");
        }

        if ((operation === "subtract" || operation === "divide") && numbers.length < 2) {
            throw new Error(`${operation} requires at least two numbers.`);
        }

        if (operation === "divide" && numbers.slice(1).some(value => value === 0)) {
            throw new Error("Division by zero is not allowed.");
        }

        const result = mathOperations[operation](numbers);

        return toolMessage({
            success: true,
            data: {
                operation,
                numbers,
                result,
            },
        });
    } catch (error: any) {
        return toolMessage({
            success: false,
            data: error.message,
        });
    }
};

export const basicMathSolveTool = createAction({
    name: "basicMathSolve",
    description: "Perform simple math operations such as add, subtract, multiply, divide, average, min, and max on an array of numbers.",
    inputParams: z.object({
        operation: z.enum(["add", "subtract", "multiply", "divide", "average", "min", "max"]).describe("Type of math operation to perform."),
        numbers: z.array(z.number()).min(1, "Provide at least one number.").describe("List of numbers to use in the calculation."),
    }),
    execute: basicMathSolve,
});


