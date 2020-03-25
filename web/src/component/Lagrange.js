import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs'

window.$sx = "0.5 1.0 1.2 2.1 "
window.$sfx = "-1.2 0.3 -1.8 1.2 "
window.$size = 4
window.$resualt = 0

class Lagrange extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            update: 0
        };
      }

    re = ()=>{
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
        this.setState({update: 1});
    }

    Lagrange = () => {
        // window.$arr_xsum = []
        // window.$arr_ysum = []
        window.$arr_Xi = []
        window.$ans = []
        var sum = 0
        console.log("in")
        // var size = parseInt(window.$size)
        // console.log("in size : " + size)
        // var value = 0
        // window.$Apr = [...Array(size)].map(e => Array(size).fill(value))
        // window.$Bpr = [Array(size)].map(e => Array(size).fill(value))
        // var i=0
        // while(window.$sx[i] != undefined){
        //     if(window.$sx[i]==" "){
        //         window.$arr_xsum.push(parseFloat(window.$S))
        //         console.log("arr_xsum : " + window.$arr_xsum)
        //         window.$S = ""
        //     }
        //     else{
        //         console.log("sx : " + window.$sx[i])
        //         window.$S = window.$S+window.$sx[i]
        //         console.log("S : " + window.$S)
        //     }
        //     i++
        // }

        // var i=0
        // while(window.$sfx[i] != undefined){
        //     if(window.$sfx[i]==" "){
        //         window.$arr_ysum.push(parseFloat(window.$S))
        //         console.log("arr_ysum : " + window.$arr_ysum)
        //         window.$S = ""
        //     }
        //     else{
        //         console.log("sfx : " + window.$sfx[i])
        //         window.$S = window.$S+window.$sfx[i]
        //         console.log("S : " + window.$S)
        //     }
        //     i++
        // }
        for(var i=0 ; i<window.$size ; i++){
            sum = 1
            for(var j=0 ; j<window.$size ; j++){
                if(j != i){
                    sum *= (window.$arr_xsum[j]-window.$x)/(window.$arr_xsum[j]-window.$arr_xsum[i]) 
                    console.log("l : " + sum)
                    // var top = window.$arr_xsum[j]-window.$x 
                    // var under = window.$arr_xsum[j]-window.$arr_xsum[i]
                    // var sum1 = (window.$arr_xsum[j]-window.$x)/(window.$arr_xsum[j]-window.$arr_xsum[i]) 
                    // console.log("arrj : " + window.$arr_xsum[j])
                    // console.log("top : " + top)
                    // console.log("arri : " + window.$arr_xsum[i])
                    // console.log("under : " + under)
                    // console.log("sum : " + sum1)
                    // console.log("sum*= : " + sum)
                }              
            }
            window.$arr_Xi.push(i)
            window.$ans.push(window.$arr_ysum[i]*sum)
            window.$resualt += window.$arr_ysum[i]*sum
            console.log("arrfx : " + window.$arr_ysum[i])
            console.log("resualt : " + window.$resualt)
        }
        this.setState({update: 2});
      }

      createTable = () => {
        let table = []
        for (let i = -1; i < window.$arr_Xi.length; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>L(i)</th>,
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

      createShowX = () => {
        if(this.state.update == 0) return 
        var size = window.$arr_xsum.length
        var show = []
        for(var i=-1 ; i<size ; i++ ){
            if(i == -1) show.push(<h1>X : </h1>)
            show.push(<h1>{window.$arr_xsum[i]} </h1>)
        }
        return <div>{show}</div>
      }

      createShowFX = () => {
        if(this.state.update == 0) return 
        var size = window.$arr_ysum.length
        var show = []
        for(var i=-1 ; i<size ; i++ ){
            if(i == -1) show.push(<h1>FX : </h1>)
            show.push(<h1>{window.$arr_ysum[i]} </h1>)
        }
        return <div>{show}</div>
      }

      handleChangeArr(i,j,e) {
        if(j == 0) window.$arr_xsum[i] = e.target.value
        if(j == 1) window.$arr_ysum[i] = e.target.value
        if(window.$arr_xsum[i] == []) window.$arr_xsum[i] = 0
        if(window.$arr_ysum[i] == []) window.$arr_ysum[i] = 0
        console.log("arrx : " + window.$arr_xsum)
        console.log("arry: " + window.$arr_ysum)
        this.setState({update: 1});
      }

    createInputArr = () => {
        if(window.$size == []) window.$size = 0
        if(window.$size == 0) return
        var size = parseInt(window.$size)
        console.log("size Arr : " + size)
        if(this.state.update == 0) {
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
                    input.push(<input onChange={this.handleChangeArr.bind(this, i ,j)}/>)
                }
                input.push(<br/>)
            }
        }
        return input
    }
    
    componentDidMount(){
            axios.get("http://192.168.99.100:8080/api/users/showLagrange").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            window.$arr_Xi = []
            window.$ans = []
            window.$sx = ""
            window.$sfx = ""
            window.$size = 0
            window.$S = ""
            window.$arr_xsum = []
            window.$arr_ysum = []
            window.$x = 0
            // window.$sx = "0.5 1.0 1.7 2.1 "
            // window.$sfx = "-1.2 0.3 -1.8 1.2 "
            // window.$size = 4
            // window.$sx = "0.5 2.1 "
            // window.$sfx = "-1.2 1.2 "
            // window.$size = 2
    }

    render()
    {
        var x = []
        var y = []
        const trace1 = {
            x: x,
            y: y,
            mode: 'lines+markers',
            name: 'function'
        }
        console.log("update : " + this.state.update) 
        if(this.state.update == 2){
            for(var i=0 ; i<window.$arr_xsum.length ; i++){
                x.push(window.$arr_xsum[i])
                y.push(window.$arr_ysum[i])
            }
            console.log("in x : " + x)  
            console.log("in y : " + y)    
            const trace1 = {
                x: x,
                y: y,
                mode: 'lines+markers',
                name: 'function'
            }
        }

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>Lagrange</p>
                </div>

                <div className="info1">
                    <h1>ANS : {window.$resualt}</h1>
                    <h1>SIZE : {window.$size}</h1>
                    <h1>x : {window.$x}</h1>
                    <div className="info1div">
                        {this.createShowX()}
                        {this.createShowFX()}
                    </div>
                </div>

                <div class="grid-container">
                    <div>
                        {/* <div><h1>X :</h1></div>
                        <div><input onChange={(event) => {window.$sx = event.target.value;this.setState({update: this.state.update++})}}/></div>
                        <div><h1>FX :</h1></div>
                        <div><input onChange={(event) => {window.$sfx = event.target.value;this.setState({update: this.state.update++})}}/></div><br/> */}
                        <div><h1>size</h1></div>
                        <div><input onChange={(event) => {
                                this.setState({update: 0})
                                window.$size = event.target.value
                                console.log("input size : " + window.$size)
                        }}/></div><br/>
                        <div><h1>x :</h1></div>
                        <div><input onChange={(event) => {window.$x = event.target.value;this.setState({update: this.state.update++})}}/></div>
                        {this.createInputArr()}
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.Lagrange}>submit</button></div>  
                    <div><button onClick={this.re}>refresh</button></div> 
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph function</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data = {[ trace1 ]}
                        />
                    </div>
                </div>

                <div className="G">
                    <div className="Head">   
                        <h1>graph error</h1>
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
                            {this.createTable()}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Lagrange;

