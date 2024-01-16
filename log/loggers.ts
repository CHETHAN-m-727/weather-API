const { createLogger, transports, format } = require("winston");

// ----Logging Function-----//

const currentDate = new Date();
const ErrorformatFile = `Error_${currentDate.getDate()}_${
  currentDate.getMonth() + 1
}_${currentDate.getFullYear()}_${currentDate.getHours()}_${currentDate.getMinutes()}.json`;
const InfoformatFile = `Info_${currentDate.getDate()}_${
  currentDate.getMonth() + 1
}_${currentDate.getFullYear()}.json`;
const loggerFunction = createLogger({
  transports: [
    // new transports.File({
    //     filename: ErrorformatFile,
    //     level: "error",
    //     format: format.combine(format.timestamp(), format.json()),
    // }),
    new transports.File({
      filename: InfoformatFile,
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
export const logger = (
  type: string,
  userId: string,
  route: string,
  input: any,
  ErrorMessage: any = "",
  stackTrace = ""
) => {
  let inputData = JSON.stringify(input);
  let message = "";
  if (type === "info") {
    message = `Info - UserId: ${userId} | route: ${route} | Input:${inputData}`;
  } else if (type === "error") {
    message = `Error - UserId: ${userId} | route: ${route} | Input:${inputData} | stackTrace:${stackTrace} | ErrorMessage:${JSON.stringify(
      ErrorMessage
    )}`;
  }
  loggerFunction.log("info", message);
};

export default loggerFunction;
