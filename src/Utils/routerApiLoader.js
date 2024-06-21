let { readdirSync } = require("fs")
const { resolve } = require("path")
module.exports = {
    /**
     * 
     * @param {import("express").Application} app 
     * @param {String} routesFolderPath
     * @param {import("express").RequestHandler}
     * @returns {void}
     */
    LoadRouters: (app, routesFolderPath, session) => {
        let routes = readdirSync(routesFolderPath).filter(file => file.endsWith(".js"))
        routes.forEach(file => {
            let routePath = resolve(routesFolderPath, file)
            let data = require(routePath)
            if ("route" in data && "version" in data && "exec" in data) {
                if ("auth" in data) {
                    app.use(`/api/v${data.version}/${data.route}`, session, data.exec)
                } else {
                    app.use(`/api/v${data.version}/${data.route}`, data.exec)
                }
                console.log("Loaded Router: " + file);
            } else {
                console.error("Error while loading " + file);
            }
        })
    }
}