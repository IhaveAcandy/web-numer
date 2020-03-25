import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs'

class GaussElimination extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            update: 0
        };
      }

      gausselimination = () => { 
        window.$arr_Xi = []
        window.$ans = [0, 0, 0]
        for(var i=0 ; i<window.$A.length-1 ; i++){
            for(var j=i+1 ; j<window.$A.length ; j++){
                 var temp = window.$A[j][i]
                for(var k=0 ; k<window.$A.length ; k++){
                    window.$A[j][k] = window.$A[j][k]-((window.$A[i][k] / window.$A[i][i]) * temp).toFixed(6)
                }
                window.$B[j] = window.$B[j] - ((window.$B[i] / window.$A[i][i]) * temp).toFixed(6)
            }
        }
        console.log(window.$A)
        console.log(window.$B)
        var k = 1
        for(var i = window.$A.length-1 ; i >= 0 ; i--){
            window.$ans[i] = window.$B[i] / window.$A[i][i];
            console.log("ans : " + i + " = " + window.$ans)
            window.$arr_Xi.push(k)
            for(var j = i-1 ; j >= 0 ; j--){
                window.$B[j] -= window.$A[j][i] * window.$ans[i]
            }
            k++
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

      createHA = (i) => {
        var size = window.$A.length
        var H =[]
        for(let j=0 ; j<size ; j++){
          H.push(<h1>{window.$A[i][j]} </h1>)
        }
        return H
      }

      createShowA = () => {
        if(this.state.update == 0) return 
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
        if(this.state.update == 0) return 
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
        this.setState({update: 1});
      }

    createInputA = () => {
        if(window.$size == []) window.$size = 0
        var size = parseInt(window.$size)
        if(this.state.update == 0){
          var value = 0
          window.$A = [...Array(size)].map(e => Array(size).fill(value))
        }
        let input = []
        for(var i=0 ; i<size ; i++){
            for(var j=0 ; j<size ; j++){
                input.push(<input onChange={this.handleChangeA.bind(this, i ,j)}/>)
            }
            input.push(<br/>)
        }
        return input
    }

    handleChangeB(i,e) {
      if(window.$B[i] == []) window.$B[i] = 0
      window.$B[i] = e.target.value
      if(window.$B[i] == []) window.$B[i] = 0
      this.setState({update: 1});
    }

  createInputB = () => {
      if(window.$size == []) window.$size = 0
      var size = parseInt(window.$size)
      if(this.state.update == 0){
        var value = 0
        window.$B = Array(size).fill(value)
      }
      let input = []
      for(var i=0 ; i<size ; i++){ 
        input.push(<input onChange={this.handleChangeB.bind(this, i)}/>)
      }
      return input
  }
    
    componentDidMount(){
            axios.get("http://192.168.99.100:8080/api/users/showCramerrule").then(res=>{
                console.log(res.data);
                this.setState({users: res.data.data});
            })
            window.$arr_Xi = []
            window.$A = []
            window.$B = []
            window.$ans = []
    }

    re = (event) => {
        this.setState({update: 1});
    }

    render()
    {

        return(
            <div className="Back">
                <div className="info0">
                    <h1>numerical method</h1>
                    <p>GaussElimination</p>
                </div>

                <div className="info1">
                    <h1>ANS : {window.$ans}</h1>
                    <div className="info1div">
                        <div><h1>A</h1></div>
                        {this.createShowA()}
                        <div><h1>B</h1></div>
                        {this.createShowB()}
                    </div>
                </div>

                <div class="grid-container">
                    <div>
                        <div><h1>size</h1></div>
                        <div><input onChange={(event) => {
                            if(window.$size == []) {
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
                    <div><button onClick={this.gausselimination}>submit</button></div>  
                    <div><button onClick={this.re.bind(this)}>refresh</button></div> 
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
                            {this.createTable()}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default GaussElimination;
