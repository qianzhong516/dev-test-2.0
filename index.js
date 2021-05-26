const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const PORT = process.env.PORT || 8000 
const app = express()

const schema = buildSchema(`
    type Query {
        longestRaisingSequence(sequence: [Int]): [Int],
    },
`)

const root = {
    longestRaisingSequence: ({sequence}) => {

        // if sequence is empty
        if(!sequence.length)
            return []

        const allSeq = [] // all continous sequences
        let end = false // flag to stop computing

        for(let i=0; i < sequence.length; i++) {

            if(end) 
                break

            // the current continous sequence
            let seq = [sequence[i]]

            for(let j=i; j < sequence.length; j++) {

                if(sequence[j] < sequence[j+1])
                    seq.push(sequence[j+1])
                else{
                    // the next i should be j+1, and +1 will be done in the outer loop
                    i = j  
                    allSeq.push(seq)
                    break
                }

                // if j reaches the end, stop computing
                if(j === sequence.length-1) {
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