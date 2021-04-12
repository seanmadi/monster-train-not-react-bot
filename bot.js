runBot = (username, channel, oauth, saveFilePath) => {
  fs = require("fs")
  const TwitchBot = require("twitch-bot")
  const artifacts = require("./resources/artifacts.json")

  const readArtifactsAsMessage = (callback) => {
    fs.readFile(saveFilePath, "utf8", function (err, data) {
      if (err) {
        return console.log(err)
      }

      const save = JSON.parse(data)
      callback(save.blessings.map((b) => b.relicDataID))
    })
  }

  const Bot = new TwitchBot({
    username,
    oauth,
    channels: [channel],
  })

  Bot.on("join", () => {
    Bot.say(
      "Type !artifacts to view which artifacts I am currently running with."
    )
  })

  Bot.on("message", (chatter) => {
    if (chatter.message === "!artifacts") {
      readArtifactsAsMessage((artifactsIds) => {
        artifactsIds.forEach((artifactId) => {
          const artifact = artifacts.find((a) => a.uuid === artifactId)
          const message = `/me ${artifact.name}: ${artifact.description}`
          Bot.say(message)
        })
      })
    }
  })

  Bot.on("error", (err) => {})
}

exports.runBot = runBot
