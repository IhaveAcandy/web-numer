import React,{Component,useState,useEffect} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse,derivative,pow,range } from 'mathjs'
import api from './api/index'


// window.$input = [0,0]
function ModifierEulerMethod(props)
{
    const [x,setX] = useState(0)
    const [graphx,setGX] = useState([])
    const [graphy,setGY] = useState([])
    const [h,setH] = useState(0)
    const [ans,setAns] = useState(0)
    const [value1,setV1] = useState(0)
    const [value2,setV2] = useState(0)
    const [error,setError] = useState(0)
    const [real,setReal] = useState(0)
    const [fx,setFX] = useState("")
    const [f,setF] = useState("")
    const [users,setUser] = useState("")
    const [update,setUpdate] = useState(0)
    var trace1 = {
        x: graphx,
        y: graphy,
        mode: 'lines+markers',
        name: 'function'
    };

    var re = ()=>{
        setFX(window.$fx)
        setX(window.$x)
        setH(window.$h)
    }

    var Forward = () => {
        var ans = 0
        const funtiondiff1 = (fx, value) => derivative(parse(fx), 'x').evaluate({ x: value })
        const funtiondiff2 = (fx, value) => derivative(derivative(parse(fx), 'x'), 'x').evaluate({ x: value })
        const funtiondiff3 = (fx, value) => derivative(derivative(derivative(parse(fx), 'x'), 'x'), 'x').evaluate({ x: value })
        const funtiondiff4 = (fx, value) => derivative(derivative(derivative(derivative(parse(fx), 'x'), 'x'), 'x'), 'x').evaluate({ x: value })
        const funtion = (fx, value) => parse(fx).evaluate({ x: value })
        const error = (xm_new, xm_old) => Math.abs((xm_new - xm_old)/ xm_new)  
        var diff = fx
        console.log("fxdiff  : " + diff)
        if(value2 == 1){
          diff = funtiondiff1(diff,x)
        }else if(value2 == 2){
          diff = funtiondiff2(diff,x)
        }else if(value2 == 3){
          diff = funtiondiff3(diff,x)
        }else if(value2 == 4){
          diff = funtiondiff4(diff,x)
        }
        console.log("fxdiff  : " + diff)
        switch (value1) {
            case 1:
                switch (value2) {
                    case 1:
                        console.log("1 1")
                        ans = (funtion(fx,x+h) - funtion(fx,x-h))/(2*h)
                        console.log("ans : " + ans)
                        break;
                    case 2:
                        console.log("1 2")
                        ans = (funtion(fx,x+h) - 2*funtion(fx,x) + funtion(fx,x-h))/pow(h,2)
                        console.log("in ans : " + ans)
                        break;
                    case 3:
                        console.log("1 3")
                        ans = (funtion(fx,x+(2*h)) - 2*funtion(fx,x+h) + 2*funtion(fx,x-h) - funtion(fx,x-(2*h)))/(2*pow(h,3))
                        console.log("ans : " + ans)
                        break;
                    case 4:
                        console.log("1 4")
                        ans = (funtion(fx,x+(2*h)) - 4*funtion(fx,x+h) + 6*funtion(fx,x) - 4*funtion(fx,x-h) + funtion(fx,x-(2*h)))/pow(h,4)
                        console.log("ans : " + ans)
                        break;
                    default:
                        console.log("error")
                }
            break;
            case 2:
                switch (value2) {
                    case 1:
                        console.log("2 1")
                        ans = (-funtion(fx,x+(2*h)) + 8*funtion(fx,x+h) - 8*funtion(fx,x-h) + funtion(fx,x-(2*h))) / (12*h)
                        console.log("ans : " + ans)
                        break;
                    case 2:
                        console.log("2 2")
                        ans = (-funtion(fx,x+(2*h)) + 16*funtion(fx,x+h) - 30*funtion(fx,x) + 16*funtion(fx,x-h) - funtion(fx,x-(2*h))) / (12*pow(h,2))
                        console.log("ans : " + ans)
                        break;
                    case 3:
                        console.log("2 3")
                        ans = (-funtion(fx,x+(3*h)) + 8*funtion(fx,x+(2*h)) - 13*funtion(fx,x+h) + 13*funtion(fx,x-h) - 8*funtion(fx,x-(2*h)) + funtion(fx,x-(3*h))) / (8*pow(h,3))
                        break;
                    case 4:
                        console.log("2 4")
                        ans = (-funtion(fx,x+(3*h)) + 12*funtion(fx,x+(2*h)) - 39*funtion(fx,x+h) + 56*funtion(fx,x) - 39*funtion(fx,x-h) + 12*funtion(fx,x-(2*h)) - funtion(fx,x-(3*h))) / (6*pow(h,4))
                        break;
                    default:
                        console.log("error")
                }
            break;
            default:
                console.log("error")
        }
        console.log("diff : " + diff)
        var e = error(diff,ans)
        setAns(ans)
        setError(e)
        setReal(diff)
        console.log("error : " + e)  
        graph()
      }

      var createTable = () => {
        let table = []
        for (let i = -1; i < 1; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>result</th>,
                <th>real</th>,
                <th>error</th>)
          }else{
            children.push(
                <td>{ans}</td>,
                <td>{real}</td>,
                <td>{error}</td>)
          }
          table.push(<tr>{children}</tr>)
        }
        return table
    }

    useEffect(() => {
        axios.get("http://192.168.99.100:8080/api/users/showForward").then(res=>{
            setUser(res.data.data)
        })
    }, [])

    // useEffect ( async () => {
    //     console.log("in")
    //     await api.getForward().then(res => {
    //         setUser(res.data.data)
    //     })
    // }, [])

    var graph = () => {
        const f = fx
        const x = range(-10, 10, 0.5).toArray()
		const y = x.map(function (x) {
			return  parse(f).evaluate({ x: x })
        }) 
        setGX(x)
        setGY(y)
        console.log("g x : " + x)  
        console.log("g y : " + y)    
        trace1 = {
            x: graphx,
            y: graphy,
            mode: 'lines+markers',
            name: 'function'
        };
    }

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>Central divided-differences</p>
                </div>

                <div className="info1">
                  <h1>value1 : {value1}</h1>
                  <h1>value2 : {value2}</h1>
                  <h1>FX : {fx}</h1>
                  <h1>X : {x}</h1>
                  <h1>H : {h}</h1>
                  <h1>ANS : {ans}</h1>
                  <h1>error : {error}</h1>
                </div>

                <div class="grid-container">
                    <div className="infoInputvalue1">   
                        <h1><input type="checkbox" onChange={() => {setV1(1)}}/> error O(h) </h1>
                        <h1><input type="checkbox" onChange={() => {setV1(2)}}/> error O(h^2) </h1>
                    </div>
                    <div className="infoInputvalue2">   
                        <h1><input type="checkbox" onChange={() => {setV2(1)}}/> differences 1 </h1>
                        <h1><input type="checkbox" onChange={() => {setV2(2)}}/> differences 2 </h1>
                        <h1><input type="checkbox" onChange={() => {setV2(3)}}/> differences 3 </h1>
                        <h1><input type="checkbox" onChange={() => {setV2(4)}}/> differences 4 </h1>
                    </div>
                </div>

                <div className="funtion">
                    <div><h1>function : </h1></div>
                    <div><input onChange={event => setFX(event.target.value)}/></div><br/>
                </div>

                <div class="grid-container">
                    <div>
                        {/* <div><h1>fx :</h1></div>
                        <div><input onChange={event => setFX(event.target.value)}/></div><br/> */}
                        <div><h1>x :</h1></div>
                        <div><input onChange={event => setX(parseFloat(event.target.value))}/></div>
                        <div><h1>h :</h1></div>
                        <div><input onChange={event => setH(parseFloat(event.target.value))}/></div>
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={Forward}>submit</button></div>  
                    <div><button onClick={re}>refresh</button></div>  
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph function</h1>
                    </div>
                    {/* {graph()} */}
                    <div class="container">
                        <Plot className="graph"
                            data = {[ trace1 ]}
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

export default ModifierEulerMethod;

