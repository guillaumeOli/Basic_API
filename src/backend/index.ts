import init_server from "./server"

async function main() {
  const server = init_server()

  try {
  server.listen({host: "0.0.0.0", port: 4000 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
  } catch(e) {
    console.error(e)
    process.exit(1)
  }
}
main()
