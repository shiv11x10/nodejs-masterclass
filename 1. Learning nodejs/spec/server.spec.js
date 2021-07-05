const axios = require('axios')

describe('calc', ()=>{
    it('test', ()=>{
        expect(true).toBe(true);
    })
})

describe('get messages', ()=>{
    it('should return 200 ok', (done)=>{
       axios.get('http://localhost:3000/message')
       .then(res=>{
        //    console.log(res.data)
            expect(res.status).toEqual(200)
           done()
       })
    })

    it('should return a list that is not empty', (done)=>{
        axios.get('http://localhost:3000/message')
        .then(res=>{
         //    console.log(res.data)
             expect(res.data.length).toBeGreaterThan(0)
            done()
        })
     })
})


describe('get messages from user', ()=>{
    it('should return 200 ok', (done)=>{
       axios.get('http://localhost:3000/message/tim')
       .then(res=>{
        //    console.log(res.data)
            expect(res.status).toEqual(200)
           done()
       })
       .catch(err=>{
           console.log(err)
       })
    })

    it("name should be tim", (done)=>{
        axios.get('http://localhost:3000/message/tim')
       .then(res=>{
        //    console.log(res.data)
            expect(res.data[0].name).toEqual('tim')
           done()
       })
    })

})
