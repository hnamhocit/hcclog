import * as fs from "fs";
import * as pc from "picocolors";
import stripAnsi from "strip-ansi"; // Correct import

enum LEVELS {
	DEBUG = "DEBUG",
	INFO = "INFO",
	WARN = "WARN",
	ERROR = "ERROR",
	LOG = "LOG",
}

interface Config {
	logFile?: boolean;
	logFileName?: string;
	bracket?: boolean;
	color?: boolean;
	timestamp?: boolean;
	localTimestamp?: boolean;
}

class Logger {
	private config: Config;

	constructor(config?: Config) {
		this.config = {
			logFileName: "app.log",
			logFile: false,
			bracket: false,
			color: true,
			timestamp: true,
			localTimestamp: false,
			...config,
		};

		if (
			this.config.logFile &&
			!fs.existsSync(this.config.logFileName as string)
		) {
			fs.writeFileSync(this.config.logFileName as string, "");
		}
	}

	private getTimestamp(): string {
		return this.config.timestamp
			? this.config.localTimestamp
				? new Date().toLocaleString() + " "
				: new Date().toISOString() + " "
			: "";
	}

	private formatMessage(level: LEVELS, message: string): string {
		switch (level) {
			case LEVELS.DEBUG:
				return pc.magenta(message);
			case LEVELS.INFO:
				return pc.blue(message);
			case LEVELS.WARN:
				return pc.yellow(message);
			case LEVELS.ERROR:
				return pc.red(message);
			case LEVELS.LOG:
				return pc.green(message);
		}
	}

	private formatTimestamp(): string {
		return pc.dim(pc.italic(this.getTimestamp()));
	}

	private formatLevel(level: LEVELS): string {
		let formatted = this.config.bracket ? `[${level}]` : ` ${level} `;
		switch (level) {
			case LEVELS.DEBUG:
				return pc.bgMagenta(pc.black(formatted));
			case LEVELS.INFO:
				return pc.bgBlue(pc.black(formatted));
			case LEVELS.WARN:
				return pc.bgYellow(pc.black(formatted));
			case LEVELS.ERROR:
				return pc.bgRed(pc.black(formatted));
			case LEVELS.LOG:
				return pc.bgGreen(pc.black(formatted));
		}
	}

	private formatString(level: LEVELS, message: any[]) {
		const timestampStyle = this.formatTimestamp();
		const levelStyle = this.formatLevel(level);

		let msg = "";
		for (const item of message) {
			if (typeof item === "object") {
				msg += JSON.stringify(item, null) + " ";
			} else {
				msg += item + " ";
			}
		}

		let messageStyle = this.formatMessage(level, msg);
		let result = `${timestampStyle}${levelStyle} ${messageStyle}`;

		if (this.config.logFile) {
			this.writeToLogFile(result + "\n");
		}

		console.log(result);
	}

	private writeToLogFile(content: string): void {
		let cleanContent = stripAnsi(content); // Use stripAnsi directly
		fs.appendFileSync(this.config.logFileName as string, cleanContent, {
			encoding: "utf8",
		});
	}

	log(...message: any) {
		this.formatString(LEVELS.LOG, message);
	}

	info(...message: any) {
		this.formatString(LEVELS.INFO, message);
	}

	warn(...message: any) {
		this.formatString(LEVELS.WARN, message);
	}

	error(...message: any) {
		this.formatString(LEVELS.ERROR, message);
	}

	debug(...message: any) {
		this.formatString(LEVELS.DEBUG, message);
	}
}

export default Logger;
