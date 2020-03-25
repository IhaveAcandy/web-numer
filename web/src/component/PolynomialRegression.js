import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse,pow } from 'mathjs'

// window.$Apr = [[0,0],[0,0]]
// window.$Bpr = [0,0]
window.$Apr = []
window.$Bpr = []
window.$size = 0
window.$sizeArr = 0
class PolynomialRegression extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            update: 0
        };
      }

      myChangesize = (event) => {
        window.$size = event.target.value
        console.log("size : " + window.$size)
        this.setState({update: this.state.update++});
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

    PolynomialRegression = ()=>{
        const math = require("mathjs"); 
        window.$S = ""
        window.$Sum = 0
        window.$Apr = []
        window.$Bpr = []
        window.$arr_Xi = []
        window.$ans = []
        console.log("in")
        var size = parseInt(window.$size)
        console.log("in size : " + size)
        var value = 0
        window.$Apr = [...Array(size)].map(e => Array(size).fill(value))
        window.$Bpr = [Array(size)].map(e => Array(size).fill(value))
        console.log("Apr : " + window.$Apr)
        console.log("Bpr : " + window.$Bpr)
        for(var i=0;i<size;i++){
            for(var j=0;j<size;j++){
                if(i==0 && j==0) window.$Apr[i][j] = window.$arr_xsum.length
                window.$Sum = 0
                this.Funsumx(i+j)
                window.$Apr[i][j] = window.$Sum 
                console.log("Apr : " + window.$Apr[i][j])
            }
        }
        console.log("Apr : " + window.$Apr)

        for(var i=0;i<size;i++){
            this.Funsumxy(i)
            window.$Bpr[i] = window.$Sum
        }
        console.log("Bpr : " + window.$Bpr)

        var detA = math.det(window.$Apr)
        console.log("det(A) : " + detA)
        for(var i =0 ;i< window.$Apr.length;i++){
            var temp = JSON.parse(JSON.stringify(window.$Apr));
            for(var j=0;j<window.$Apr.length;j++){
                    temp[j][i] = window.$Bpr[j]
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
        if(window.$sizeArr == []) window.$sizeArr = 0
        if(window.$sizeArr == 0) return
        var size = parseInt(window.$sizeArr)
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
            axios.get("http://192.168.99.100:8080/api/users/showPolynomialregression").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            // window.$sx = "10 15 20 30 40 50 60 70 80 "
            // window.$sfx = "5 9 15 18 22 30 35 38 43 "
            window.$sx = ""
            window.$sfx = ""
            window.$S = ""
            window.$arr_xsum = []
            window.$arr_ysum = []
            window.$Sum = 0
            // window.$Apr = [[0,0],[0,0]]
            // window.$Bpr = [0,0]
            window.$Apr = []
            window.$Bpr = []
            window.$arr_Xi = []
            window.$ans = []
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
                    <p>PolynomialRegression</p>
                </div>

                <div className="info1">
                    {/* <h1>ANS : {window.$ans}</h1> */}
                    {/* <h1>X : {window.$sx}</h1>
                    <h1>FX : {window.$sfx}</h1>
                    <h1>SIZE : {window.$size}</h1> */}
                    <div className="info1div">
                        {this.createShowX()}
                        {this.createShowFX()}
                    </div>
                </div>

                <div class="grid-container">
                    <div>
                    <div><h1>size :</h1></div>
                    <div><input onChange={this.myChangesize}/></div><br/>
                    <div><h1>size input</h1></div>
                        <div><input onChange={(event) => {
                                this.setState({update: 0})
                                window.$sizeArr = event.target.value
                                console.log("input size : " + window.$size)
                        }}/></div>
                        {this.createInputArr()}
                        {/* <div><h1>x :</h1></div>
                        <div><input onChange={this.myChangex}/></div>
                        <div><h1>fx :</h1></div>
                        <div><input onChange={this.myChangefx}/></div><br/> */}
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                <div className="info3">
                    <div><button onClick={this.PolynomialRegression}>submit</button></div>  
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
export default PolynomialRegression;
