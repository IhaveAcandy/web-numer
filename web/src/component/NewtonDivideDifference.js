import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs'

class NewtonDivideDifference extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            ans: 0,
            x: 0,
            update: 0,
        };
      }

    componentDidMount(){
            axios.get("http://192.168.99.100:8080/api/users/showNewtondividedifference").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            // window.$X = [[0,9.81,2,3,4,5],[20000,9.7487,8,9,10,11],[40000,9.6879,14,15,16,17],[60000,9.6879,20,21,22,23],[80000,9.5682,26,27,28,29]]
            window.$arr_Xi = []
            window.$ans = []
            window.$sx = ""
            window.$sfx = ""
            window.$S = ""
            window.$size = 0
            window.$X = []
            window.$arr_xsum = []
            window.$arr_ysum = []
    }

    // handleChange(i,j,e) {
    //     window.$X[i][j] = e.target.value
    //     console.log("Y : "+window.$X)
    //   }

    // createInput = () => {
    //     if(window.$size == []) window.$size = 0
    //     var size = parseInt(window.$size)
    //     var value = 0
    //     window.$X = [...Array(size)].map(e => Array(size).fill(value))
    //     console.log("X : "+window.$X)
    //     let input = []
    //     for(var i=0 ; i<size ; i++){
    //         for(var j=0 ; j<size ; j++){
    //             input.push(<input onChange={this.handleChange.bind(this, i ,j)}/>)
    //         }
    //         input.push(<br/>)
    //     }
    //     console.log("X : "+window.$X)
    //     console.log("input : "+input)
    //     return input
    // }

    NewtonDivideDifference = () => {
        console.log("in")
        window.$arr_Xi = []
        window.$ans = []
        var k = 1
        console.log("X : " + window.$X)
        var size = window.$X.length-1
        console.log("size : " + size)
        for(var j=2 ; j<window.$X.length+1 ; j++){
            for(var i=0 ; i<size ; i++){
                console.log(window.$X[i][j])
                window.$X[i][j] = (window.$X[i+1][j-1] - window.$X[i][j-1]) / ( window.$X[i+(j-1)][0] - window.$X[i][0] )
                console.log(window.$X[i][j])
            }
            window.$arr_Xi.push(k)
            window.$ans.push(window.$X[0][j])
            k++
            size--
        }
        var ans = 0
        var temp = 1
        for(var i=0 ; i<window.$X.length-1 ; i++){
            if(i>0) temp *= (42000-window.$X[i-1][0])
            ans += window.$X[0][i+1]*temp
        }
        console.log("ans : "+ans)
        this.setState({ans: ans})
        this.setState({update: 2});
    }

    createTable = () => {
        let table = []
        for (let i = -1; i < window.$arr_Xi.length; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>C(i)</th>,
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

    re = ()=>{
        var size = parseInt(window.$size)
        window.$X = [...Array(size)].map(e => Array(size+1).fill(0))
        window.$arr_xsum = Array(size).fill(0)
        window.$arr_ysum = Array(size).fill(0)
        console.log("X : "+window.$X)
        var i=0
        var j=0
        while(window.$sx[i] != undefined){
            if(window.$sx[i]==" "){
                window.$X[j][0] = parseFloat(window.$S)
                window.$arr_xsum[j] = parseFloat(window.$S)
                console.log("X : " + window.$X[j][0])
                window.$S = ""
                j++
            }
            else{
                console.log("sx : " + window.$sx[i])
                window.$S = window.$S+window.$sx[i]
                console.log("S : " + window.$S)
            }
            i++
        }
        console.log("X : " + window.$X)
        var i=0
        var j=0
        while(window.$sfx[i] != undefined){
            if(window.$sfx[i]==" "){
                window.$X[j][1] = parseFloat(window.$S)
                window.$arr_ysum[j] = parseFloat(window.$S)
                console.log("X : " + window.$X[j][1])
                window.$S = ""
                j++
            }
            else{
                console.log("sfx : " + window.$sfx[i])
                window.$S = window.$S+window.$sfx[i]
                console.log("S : " + window.$S)
            }
            i++
        }
        console.log("X : " + window.$X)
        this.setState({update: 1});
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
        window.$X[i][j] = e.target.value
        if(j == 0) window.$arr_xsum[i] = e.target.value
        if(j == 1) window.$arr_ysum[i] = e.target.value
        if(window.$X[i][j] == []) window.$X[i][j] = 0
        console.log("X : " + window.$X)
        this.setState({update: 1});
      }

    createInputArr = () => {
        if(window.$size == []) window.$size = 0
        var size = parseInt(window.$size)
        console.log("size Arr : " + size)
        if(this.state.update == 0) {
            window.$X = [...Array(size)].map(e => Array(size+1).fill(0))
            window.$arr_xsum = Array(size).fill(0)
            window.$arr_ysum = Array(size).fill(0)
        }
        let input = []
        for(var i=0 ; i<size ; i++){
            for(var j=0 ; j<2 ; j++){
                input.push(<input onChange={this.handleChangeArr.bind(this, i ,j)}/>)
            }
            input.push(<br/>)
        }
        return input
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
        };
        console.log("update : " + this.state.update) 
        if(this.state.update == 2){
            for(var i=0 ; i<window.$size ; i++){
                x.push(window.$X[i][0])
                y.push(window.$X[i][1])
            }
            console.log("in x : " + x)  
            console.log("in y : " + y)    
            const trace1 = {
                x: x,
                y: y,
                mode: 'lines+markers',
                name: 'function'
            };
        }

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>NewtonDivideDifference</p>
                </div>

                <div className="info1">
                    <h1>ANS : {this.state.ans}</h1>
                    {/* <h1>X : {window.$sx}</h1>
                    <h1>FX : {window.$sfx}</h1> */}
                    <h1>SIZE : {window.$size}</h1>
                    <div className="info1div">
                        {this.createShowX()}
                        {this.createShowFX()}
                    </div>
                </div>

                <div class="grid-container">
                    <div>
                        {/* <div><h1>x :</h1></div>
                        <div><input onChange={(event) => {window.$sx = event.target.value;this.setState({update: this.state.update++})}}/></div>
                        <div><h1>fx :</h1></div>
                        <div><input onChange={(event) => {window.$sfx = event.target.value;this.setState({update: this.state.update++})}}/></div><br/>
                        <div><h1>size :</h1></div>
                        <div><input onChange={(event) => {window.$size = event.target.value;this.setState({update: this.state.update++})}}/></div><br/> */}
                        {/* {this.createInput()} */}

                        <div><h1>size</h1></div>
                        <div><input onChange={(event) => {
                                this.setState({update: 0})
                                window.$size = event.target.value
                                console.log("input size : " + window.$size)
                        }}/></div><br/>
                        <div><h1>X | F(x)</h1></div>
                        {this.createInputArr()}
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.NewtonDivideDifference}>submit</button></div>  
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
                        <h1>graph answer</h1>
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
export default NewtonDivideDifference;
