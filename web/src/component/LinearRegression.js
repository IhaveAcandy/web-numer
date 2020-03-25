import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse,pow } from 'mathjs'

// window.$sx = "10 15 20 30 40 50 60 70 80 "
// window.$sfx = "5 9 15 18 22 30 35 38 43 "
window.$sx = ""
window.$sfx = ""
window.$S = ""
window.$arr_xsum = []
window.$arr_ysum = []
window.$Sum = 0
window.$Alr = [[0,0],[0,0]]
window.$Blr = [0,0]
// window.$Alr = []
// window.$Blr = []


class LinearRegression extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            fx: "",
            xl: 2,
            xr: 2,
            update: 0
        };
      }

    //   myChangex = (event) => {
    //     window.$sx = event.target.value
    //     this.setState({update: this.state.update++});
    //   }

    //   myChangefx = (event) => {
    //     window.$sfx = event.target.value
    //     this.setState({update: this.state.update++});
    //   }

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

    LinearRegression = ()=>{
        const math = require("mathjs"); 
        window.$arr_Xi = []
        window.$ans = []
        console.log("in")
        // window.$Alr[0][0] = window.$arr_xsum.length
        // window.$Sum = 0
        // this.Funsumx(1)
        // window.$Alr[0][1] = window.$Sum 
        // window.$Sum = 0
        // this.Funsumx(1)
        // window.$Alr[1][0] = window.$Sum 
        // window.$Sum = 0
        // this.Funsumx(2)
        // window.$Alr[1][1] = window.$Sum 
        // console.log("Alr : " + window.$Alr)
        // console.log("Alr[0][0] : " + window.$Alr[0][0])
        // console.log("Alr[0][1] : " + window.$Alr[0][1])
        // console.log("Alr[1][0] : " + window.$Alr[1][0])
        // console.log("Alr[1][1] : " + window.$Alr[1][1])
        for(var i=0;i<2;i++){
            for(var j=0;j<2;j++){
                // position 0 0 
                if(i==0 && j==0) window.$Alr[i][j] = window.$arr_xsum.length
                this.Funsumx(i+j)
                window.$Alr[i][j] = window.$Sum 
            }
        }
        console.log("Alr : " + window.$Alr)
        // window.$Sum = 0
        // this.Funsumy()
        // window.$Blr[0] = window.$Sum 
        // window.$Sum = 0
        // this.Funsumxy()
        // window.$Blr[1] = window.$Sum
        for(var i=0;i<2;i++){
            this.Funsumxy(i)
            window.$Blr[i] = window.$Sum
        }
        console.log("Blr : " + window.$Blr)
        var detA = math.det(window.$Alr)
        console.log("det(A) : " + detA)
        for(var i =0 ;i< window.$Alr.length;i++){
            var temp = JSON.parse(JSON.stringify(window.$Alr));
            for(var j=0;j<window.$Alr.length;j++){
                    temp[j][i] = window.$Blr[j]
            }
            window.$arr_Xi.push(i+1)
            window.$ans.push((math.det(temp)/detA).toFixed(6))
            console.log("1 ; " + math.det(temp))
            console.log("2 ; " + (math.det(temp)/detA).toFixed(6))   
        }
        this.setState({update: 2});
    }

    Funsumx = (p) => {
        window.$Sum = 0
        for(var i=0;i< window.$arr_xsum.length;i++){
          window.$Sum=window.$Sum+pow(window.$arr_xsum[i],p)
        }
    }

    // Funsumy = () => {
    //     for(var i=0;i< window.$arr_xsum.length;i++){
    //       window.$Sum=window.$Sum+window.$arr_ysum[i]
    //     }
    // }

    // Funsumxy = () => {
    //     for(var i=0;i< window.$arr_xsum.length;i++){
    //       window.$Sum=window.$Sum+(window.$arr_xsum[i]*window.$arr_ysum[i])
    //     }
    // }

    Funsumxy = (p) => {
        window.$Sum = 0
        for(var i=0;i< window.$arr_xsum.length;i++){
          window.$Sum=window.$Sum+(pow(window.$arr_xsum[i],p)*window.$arr_ysum[i])
        }
    }

      createTable = () => {
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
            axios.get("http://192.168.99.100:8080/api/users/showLinearregression").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            window.$arr_Xi = []
            window.$ans = []
            // window.$sx = "10 15 20 30 40 50 60 70 80 "
            // window.$sfx = "5 9 15 18 22 30 35 38 43 "
            window.$sx = ""
            window.$sfx = ""
            window.$S = ""
            window.$arr_xsum = []
            window.$arr_ysum = []
            window.$Sum = 0
            window.$Alr = [[0,0],[0,0]]
            window.$Blr = [0,0]
            // window.$Alr = []
            // window.$Blr = []
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
                    <p>LinearRegression</p>
                </div>

                <div className="info1">
                    {/* <h1>ANS : {window.$ans}</h1> */}
                    {/* <h1>X : {window.$sx}</h1>
                    <h1>FX : {window.$sfx}</h1> */}
                    <div className="info1div">
                        {this.createShowX()}
                        {this.createShowFX()}
                    </div>
                </div>

                <div class="grid-container">
                    <div>
                        <div><h1>size</h1></div>
                        <div><input onChange={(event) => {
                                this.setState({update: 0})
                                window.$size = event.target.value
                                console.log("input size : " + window.$size)
                        }}/></div>
                        {this.createInputArr()}
                        {/* <div><h1>x :</h1></div>
                        <div><input onChange={this.myChangex}/></div>
                        <div><input onChange={(event) => {window.$sx = event.target.value;this.setState({update: this.state.update++})}}/></div>
                        <div><h1>fx :</h1></div>
                        <div><input onChange={(event) => {window.$sfx = event.target.value;this.setState({update: this.state.update++})}}/></div><br/> */}
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.LinearRegression}>submit</button></div>
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
export default LinearRegression;
