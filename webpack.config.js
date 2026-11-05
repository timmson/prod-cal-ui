const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const outputDir = path.resolve(__dirname, "./docs")

module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: outputDir,
		filename: "index.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"]
				}
			},
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)/,
				loader: "ts-loader",
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							// Bootstrap still relies on deprecated SASS color/`if()` helpers;
							// quietDeps keeps those dependency-only warnings out of the dev overlay.
							sassOptions: {quietDeps: true}
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new MiniCssExtractPlugin({filename: "index.css"})
	],
	devServer: {
		static: {
			directory: outputDir,
		},
		compress: true,
		port: 3000
	}
}
