const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const PORT = process.env.PORT || 8000 
const app = express()

const schema = buildSchema(`
    type Query {
        input(arr: [Int]): [Int]
    }
`)

const root = {
    input: ({arr}) => {

        const allSeq = [] // all continous sequences
        let end = false // flag to stop computing

        for(let i=0; i < arr.length; i++) {

            if(end) 
                break

            // the current continous sequence
            let seq = [arr[i]]

            for(let j=i; j < arr.length; j++) {

                if(arr[j] < arr[j+1])
                    seq.push(arr[j+1])
                else{
                    // the next i should be j+1, and +1 will be done in the outer loop
                    i = j  
                    allSeq.push(seq)
                    break
                }

                // if j reaches the end, stop computing
                if(j === arr.length-1) {
                    allSeq.push(seq)
                    end = true
                }
            }
        }

        allSeq.sort((a, b) => {
            return b.length - a.length
        })

        return allSeq[0]
    }
}

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log('The server is listening to PORT: '+PORT)
})