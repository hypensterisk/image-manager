import express from'express'
import{createReadStream}from'fs'
import{readdir,rm}from'fs/promises'
import{dirname,join}from'path'
import{argv}from'process'
import{fileURLToPath}from'url'

const cwd=dirname(fileURLToPath(import.meta.url))
const imagePath=argv.at(2)
const server=express()

server.get('/',(_req,res)=>createReadStream(join(cwd,'./www/index.html')).pipe(res))
server.get('/index.js',(_req,res)=>createReadStream(join(cwd,'./www/index.js')).pipe(res))
server.get('/index.json',async(_req,res)=>res.end(JSON.stringify(await readdir(imagePath))))
server.get('/image/:filename',(req,res)=>createReadStream(join(imagePath,req.params.filename)).pipe(res))
server.get('/remove/:filename',async(req,res)=>res.end(await rm(join(imagePath,req.params.filename))))
server.listen(8080)