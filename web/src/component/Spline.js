import React,{Component,useEffect,useState} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs'
import { solveFor,Expression,Equation } from 'algebra.js';

function Spline(props)
{
    const [X,setX] = useState("")
    const [FX,setFX] = useState("")
    const [users,setUser] = useState("")
    const [update,setUpdate] = useState(-1)
    var arrX = []
    var arrFX = []
    var S = " "
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)
    var [size,setSize] = useState(0)
    const [fx,setfx] = useState("")
    // var [A,setA] = useState()
    // var input = []

    useEffect(() => {
            // axios.get("http://localhost:3001/api/users/showSpline").then(res=>{
            axios.get("http://192.168.99.100:8080/api/users/showSpline").then(res=>{
                setUser(res.data.data)
                setXL(res.data.data[0].XL)
                setXR(res.data.data[0].XR)
                setfx(res.data.data[0].fx)
            })
            window.$sx = " "
            window.$sfx = " "
            window.$ans = []
            window.$arr_Xi = []
            window.$size = 0
            window.$arr_xsum = []
            window.$arr_ysum = []
    }, [])

    var re = ()=>{
        window.$arr_xsum = []
        window.$arr_ysum = []
        var i=0
        while(window.$sx[i] != undefined){
            if(window.$sx[i]==" "){
                window.$arr_xsum.push(parseFloat(window.$S))
                console.log("arr_xsum : " + window.$arr_xsum)
                window.$S = ""
            }
            else{
                console.log("sx : " + window.$sx[i])
                window.$S = window.$S+window.$sx[i]
                console.log("S : " + window.$S)
            }
            i++
        }

        var i=0
        while(window.$sfx[i] != undefined){
            if(window.$sfx[i]==" "){
                window.$arr_ysum.push(parseFloat(window.$S))
                console.log("arr_ysum : " + window.$arr_ysum)
                window.$S = ""
            }
            else{
                console.log("sfx : " + window.$sfx[i])
                window.$S = window.$S+window.$sfx[i]
                console.log("S : " + window.$S)
            }
            i++
        }
        setUpdate(update+2)
    }

    // var handleChangeA = (i,j,e) => {
    //     console.log("change i j e : " + i + " " + j +" " + e.target.value)
    //     window.$A[i][j] = e.target.value
    //     if(window.$A[i][j] == []) window.$A[i][j] = 0
    //     console.log("A : "+window.$A)
    //     setUpdate(1)
    //   }

    // var createInputA = () => {
    //     if(window.$size == []) window.$size = 0
    //     var size = parseInt(window.$size)
    //     if(update == 0){
    //       console.log("create size : " + size)
    //       var value = 0
    //       window.$A = [...Array(size)].map(e => Array(size).fill(value))
    //       console.log("create A : " + window.$A)
    //     }
    //     let input = []
    //     for(var i=0 ; i<size ; i++){
    //         for(var j=0 ; j<size ; j++){
    //             input.push(<input onChange={handleChangeA.bind(this, i ,j)}/>)
    //             // input.push(<input value1={i} value2={j} onChange={(event) => {handleChangeA(this.value1,this.value2,event)}}/>)
    //             // input.push(<input onChange={(event) => {window.$A[i][j] = event.target.value}}/>)
    //         }
    //         input.push(<br/>)
    //     }
    //     console.log("A : " + window.$A)
    //     console.log("input : " + input)
    //     return input
    // }

    // var handleChangeA = (i,j,e) => {
    //     console.log("change i j e : " + i + " " + j +" " + e.target.value)
    //     A[i][j] = e.target.value
    //     if(A[i][j] == []) A[i][j] = 0
    //     console.log("A : "+ A)
    //     setUpdate(1)
    //   }

    // var createInputA = () => {
    //     if(size == []) size = 0
    //     // var size = parseInt(size)
    //     // if(update == 0){
    //       console.log("create size : " + size)
    //       A = [...Array(parseInt(size))].map(e => Array(parseInt(size)).fill(0))
    //       console.log("create A : " + A)
    //     for(var i=0 ; i<size ; i++){
    //         for(var j=0 ; j<size ; j++){
    //             input.push(<input onChange={handleChangeA.bind(this, i ,j)}/>)
    //             // input.push(<input value1={i} value2={j} onChange={(event) => {handleChangeA(this.value1,this.value2,event)}}/>)
    //             // input.push(<input onChange={(event) => {window.$A[i][j] = event.target.value}}/>)
    //         }
    //         input.push(<br/>)
    //     }
    //     console.log("c A : " + A)
    //     console.log("input : " + input)
    // // }
    //     return input
    // }

    var createShowX = () => {
        if(update == 0) return 
        var size = window.$arr_xsum.length
        var show = []
        for(var i=-1 ; i<size ; i++ ){
            if(i == -1) show.push(<h1>X : </h1>)
            show.push(<h1>{window.$arr_xsum[i]} </h1>)
        }
        return <div>{show}</div>
    }

    var createShowFX = () => {
        if(update == 0) return 
        var size = window.$arr_ysum.length
        var show = []
        for(var i=-1 ; i<size ; i++ ){
            if(i == -1) show.push(<h1>FX : </h1>)
            show.push(<h1>{window.$arr_ysum[i]} </h1>)
        }
        return <div>{show}</div>
    }

    var handleChangeArr = (i,j,e) => {
        if(j == 0) window.$arr_xsum[i] = e.target.value
        if(j == 1) window.$arr_ysum[i] = e.target.value
        if(window.$arr_xsum[i] == []) window.$arr_xsum[i] = 0
        if(window.$arr_ysum[i] == []) window.$arr_ysum[i] = 0
        console.log("arrx : " + window.$arr_xsum)
        console.log("arry: " + window.$arr_ysum)
        setUpdate(update+1)
    }

    var createInputArr = () => {
        if(window.$size == []) window.$size = 0
        if(window.$size == 0) return
        var size = parseInt(window.$size)
        console.log("size Arr : " + size)
        if(update == 0) {
            window.$arr_xsum = Array(size).fill(0)
            window.$arr_ysum = Array(size).fill(0)
            console.log("arrx : " + window.$arr_xsum)
            console.log("arry: " + window.$arr_ysum)
        }
        let input = []
        for(var i=-1 ; i<size ; i++){
            if(i == -1){
                input.push(<h1>x || fx</h1>)
            }else{
                for(var j=0 ; j<2 ; j++){
                    input.push(<input onChange={handleChangeArr.bind(this, i ,j)}/>)
                }
                input.push(<br/>)
            }
        }
        return input
    }

    var Spline = () => {
        window.$ans = []
        window.$arr_Xi = []
        var size = (2*window.$arr_xsum.length-2)+(window.$arr_xsum.length-1)
        console.log("size : " + size)
        var value = 0
        var a = [...Array(size)].map(e => Array(size).fill(value))
        var b = [Array(size)].map(e => Array(size).fill(value))
        console.log("a : " + a)
        console.log("b : " + b)
        var j = 0
        var xi = 0
        for(var i=0;i<(2*window.$arr_xsum.length-2);i++){
            b[i]=window.$arr_ysum[xi]
            if(i%2==0){
                a[i][j] = window.$arr_xsum[xi]**2
                a[i][j+1] = window.$arr_xsum[xi]
                a[i][j+2] = 1
                xi++
            }else {
                a[i][j] = window.$arr_xsum[xi]**2
                a[i][j+1] = window.$arr_xsum[xi]
                a[i][j+2] = 1
                j+=3
            }
        }
        console.log("a : " + a)
        console.log("b : " + b)
        j = 0
        xi = 1
        for(i=i ; i<a.length-1 ; i++){
            a[i][j] = 2*window.$arr_xsum[xi]
            a[i][j+1] = 1
            a[i][j+3] = -2*window.$arr_xsum[xi]
            a[i][j+4] = -1
            j+=3
            b[i]=0
            xi++
        }
        a[i][0] = 1
        b[i] = 0
        console.log("a : " + a)
        console.log("b : " + b)

        const math = require("mathjs"); 
        var detA = math.det(a)
        console.log("det(A) : " + detA)
        for(var i=0 ; i<a.length ; i++){
            var temp = JSON.parse(JSON.stringify(a));
            for(var j=0 ; j<a.length ; j++){
                    temp[j][i] = b[j]
            }
            window.$arr_Xi.push(i+1)
            window.$ans.push((math.det(temp)/detA).toFixed(6))
            console.log("arr_Xi ; " + window.$arr_Xi)
            console.log("ans ; " + window.$ans)  
            console.log("1 ; " + math.det(temp))
            console.log("2 ; " + (math.det(temp)/detA).toFixed(6))  
        }
        setUpdate(update+1)
    }

    var createTable = () => {
        let table = []
        for (let i = -1; i < window.$arr_Xi.length; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>X(i)</th>,
                <th>ans</th>)
          }else{
            children.push(
                <td>{window.$arr_Xi[i]}</td>,
                <td>{window.$ans[i]}</td>)
          }
          table.push(<tr>{children}</tr>)
        }
        return table
      }
    
        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>Spline</p>
                </div>

                <div className="info1">
                    {/* <h1>X : {X}</h1>
                    <h1>FX : {FX}</h1> */}
                    <div className="info1div">
                        {createShowX()}
                        {createShowFX()}
                    </div>
                </div>

                <div class="grid-container">
                    <div>
                        {/* <div><h1>x :</h1></div>
                        <div><input onChange={event => setX(event.target.value)}/></div>
                        <div><h1>fx :</h1></div>
                        <div><input onChange={event => setFX(event.target.value)}/></div><br/> */}
                        <div><h1>size :</h1></div>
                        <div><input onChange={event => {
                                    window.$size = event.target.value
                                    if(window.$size == []) setUpdate(-1)
                                    if(window.$size != []) setUpdate(0)}}/>
                        </div>
                        {/* {createInputA()} */}
                        {createInputArr()}
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={Spline}>submit</button></div>  
                    <div><button onClick={re}>refresh</button></div> 
                    {/* <div><button>FX : {fx} <br/> XL : {XL} <br/> FX : {XR} </button></div>   */}
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data={[
                                {
                                    x: window.$arr_Xi,
                                    y: window.$ans
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className = "T">
                    <div className="Head">   
                        <h1>Table</h1>
                    </div>
                    <div class="container">
                        <table id="customers">
                            {createTable()}
                        </table>
                    </div>
                </div>
            </div>
        )
}
export default Spline;

