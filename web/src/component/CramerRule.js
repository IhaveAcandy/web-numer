import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse,pow } from 'mathjs'
import api from './api/index'

window.$arr_Xi = []
window.$arr_detAi = []
window.$A = []
window.$B = []
// window.$A=[
//     [-2,3,1],
//     [3,4,-5],
//     [1,-2,1]
// ]
// window.$B=[3,3,3]
// window.$A = [[9,375],[375,20625]]
// window.$B = [215,11605]
window.$ans = []
window.$sum = 0

class CramerRule extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            fx: "",
            update: 0
        };
      }

      cramer = () => {
        const math = require("mathjs");  
        window.$arr_Xi = []
        window.$arr_detAi = []
        window.$ans = []
        var detA = math.det(window.$A)
        for(var i =0 ;i< window.$A.length;i++){
            var temp = JSON.parse(JSON.stringify(window.$A));
            for(var j=0;j<window.$A.length;j++){
                    temp[j][i] = window.$B[j]
            }
            window.$arr_Xi.push(i+1)
            // window.$arr_detAi.push(math.det(temp))
            window.$ans.push((math.det(temp)/detA).toFixed(6))
            console.log(window.$ans[i])
        }
        this.setState({update: this.state.update++});
      }

      createTable = () => {
        let table = []
        for (let i = -1; i < window.$arr_Xi.length; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>X(i)</th>,
                <th>det(Ai)/det(A)</th>)
          }else{
            children.push(
                <td>{window.$arr_Xi[i]}</td>,
                <td>{window.$ans[i]}</td>)
          }
          table.push(<tr>{children}</tr>)
        }
        return table
      }
    
      createHA = (i) => {
        console.log("in HA")
        var size = window.$A.length
        var H =[]
        for(let j=0 ; j<size ; j++){
          console.log("A ca : " + window.$A[i][j])
          H.push(<h1>{window.$A[i][j]} </h1>)
        }
        return H
      }

      createShowA = () => {
        console.log("in showA")
        console.log("update in createShowA= " + this.state.update)
        if(this.state.update == 0) {
            console.log("update = " + this.state.update)
            return
        } 
        var size = window.$A.length
        var show = []
        for(var i=0 ; i<size ; i++ ){
          var h = this.createHA(i)
          show.push(<div>{h}</div>)
          var h = []
        }
        return show
      }

      createShowB = () => {
        console.log("in showB")
        console.log("update in createShowA= " + this.state.update)
        if(this.state.update == 0) {
            console.log("update = " + this.state.update)
            return
        } 
        var size = window.$B.length
        var show = []
        for(var i=0 ; i<size ; i++ ){
            show.push(<h1>{window.$B[i]} </h1>)
        }
        return <div>{show}</div>
      }

      handleChangeA(i,j,e) {
        window.$A[i][j] = e.target.value
        if(window.$A[i][j] == []) window.$A[i][j] = 0
        console.log("A : "+window.$A)
        this.setState({update: 1});
      }

    createInputA = () => {
        if(window.$size == []) window.$size = 0
        var size = parseInt(window.$size)
        if(this.state.update == 0){
          var value = 0
          window.$A = [...Array(size)].map(e => Array(size).fill(value))
          console.log("A : "+window.$A)
        }
        let input = []
        for(var i=0 ; i<size ; i++){
            for(var j=0 ; j<size ; j++){
                input.push(<input onChange={this.handleChangeA.bind(this, i ,j)}/>)
            }
            input.push(<br/>)
        }
        console.log("A : "+window.$A)
        console.log("input : "+input)
        return input
    }

    handleChangeB(i,e) {
      if(window.$B[i] == []) window.$B[i] = 0
      console.log("B in change : "+window.$B[0])
      window.$B[i] = e.target.value
      if(window.$B[i] == []) window.$B[i] = 0
      console.log("B : "+window.$B)
      console.log("B : "+window.$B[i+1])
      this.setState({update: 1});
    }

  createInputB = () => {
      if(window.$size == []) window.$size = 0
      var size = parseInt(window.$size)
      if(this.state.update == 0){
        var value = 0
        window.$B = Array(size).fill(value)
        console.log("B create : "+window.$B)
      }
      let input = []
      for(var i=0 ; i<size ; i++){ 
        input.push(<input onChange={this.handleChangeB.bind(this, i)}/>)
      }
      console.log("B : "+window.$B)
      console.log("input : "+input)
      return input
  }

    componentDidMount(){
            axios.get("http://192.168.99.100:8080/api/users/showCramerrule").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            window.$arr_Xi = []
            window.$arr_detAi = []
            // window.$A = [
            //     [0, 0, 0],
            //     [0, 0, 0],
            //     [0, 0, 0]
            //     ]
            // window.$B = [0, 0, 0]
            window.$ans = []
    }

    // componentDidMount = async () => {
    //     console.log("in")
    //     await api.getCramerrule().then(res => {
    //         this.setState({users: res.data.data});
    //     })
    //     window.$arr_Xi = []
    //     window.$arr_detAi = []
    //     window.$ans = []
    // }


    re = (event) => {
        this.setState({update: 1});
        console.log("A in re : " + window.$A)
        console.log("B in re : " + window.$B)
        console.log("update in re = " + this.state.update)
    }

    render()
    {

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>CramerRule</p>
                </div>

                <div className="info1">
                    <h1>ANS : {window.$ans}</h1>
                    <div className="info1div">
                        {/* <h1>{window.$A[0][0]} : {window.$A[0][1]} : {window.$A[0][2]} </h1>
                        <h1>{window.$A[1][0]} : {window.$A[1][1]} : {window.$A[1][2]} </h1>
                        <h1>{window.$A[2][0]} : {window.$A[2][1]} : {window.$A[2][2]} </h1> */}
                        <div><h1>A</h1></div>
                        {this.createShowA()}
                        <div><h1>B</h1></div>
                        {this.createShowB()}
                    </div>
                    {/* <div>
                        <h1> {window.$B[0]} : {window.$B[1]} : {window.$B[2]} </h1>
                    </div> */}
                </div>

                <div class="grid-container">
                    <div>
                        {/* <div><h1>A :</h1></div>
                        <div><h1><input onChange={this.myChangeA00}/> <input onChange={this.myChangeA01}/> <input onChange={this.myChangeA02}/> </h1></div>
                        <div><h1><input onChange={this.myChangeA10}/> <input onChange={this.myChangeA11}/> <input onChange={this.myChangeA12}/> </h1></div>
                        <div><h1><input onChange={this.myChangeA20}/> <input onChange={this.myChangeA21}/> <input onChange={this.myChangeA22}/> </h1></div>
                        <div><h1>B :</h1></div>
                        <div><h1><input onChange={this.myChangeB0}/> <input onChange={this.myChangeB1}/> <input onChange={this.myChangeB2}/> </h1></div> */}
                        <div><h1>size</h1></div>
                        <div><input onChange={(event) => {
                            if(window.$size == []) {
                                console.log("size = 0")
                                this.setState({update: 0})
                                window.$size = event.target.value;
                            }else{
                                window.$size = event.target.value;
                                this.setState({update: this.state.update++})
                            }
                            }}/></div><br/>
                        <div><h1>A</h1></div>
                        {this.createInputA()}
                        <div><h1>B</h1></div>
                        {this.createInputB()}
                    </div>

                    <div className= "mongoDB">
                        <h1>input</h1>
                        <div id="b">{<ShowUser users={this.state.users}/>}</div>
                    </div>
                </div>

                

                <div className="info3">
                    <div><button onClick={this.cramer}>submit</button></div>  
                    <div><button onClick={this.re.bind(this)}>refresh</button></div>  
                </div>

                {/* <div className="G">
                    <div className="Head">   
                        <h1>graph</h1>
                    </div>
                    <div class="container">
                        <Plot className="graph"
                            data={[
                                {
                                    x: window.$arr_x,
                                    y: window.$arr_y
                                }
                            ]}
                        />
                    </div>
                </div> */}

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
                            {this.createTable()}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default CramerRule;
