import React,{Component} from 'react'
import axios from 'axios';
import ShowUser from './componentForHomeContent/ShowUser'
import './style.css';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs'

// window.$arr_Xi = [1,2,3]
// window.$LU = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]
//     ]
// window.$Y=[0,0,0]
// window.$X=[0,0,0]
// window.$ANS = []
window.$X = []
window.$Y = []

class LUDecomposition extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
            users:"",
            update: 0
        };
      }

      LUDecomposition = () => {
        // window.$ANS = []
        // window.$LU[0][0] = window.$A[0][0]
        // window.$LU[1][0] = window.$A[1][0]
        // window.$LU[2][0] = window.$A[2][0]
        // window.$LU[0][1] = window.$A[0][1]/window.$LU[0][0]
        // window.$LU[0][2] = window.$A[0][2]/window.$LU[0][0]
        // window.$LU[1][1] = window.$A[1][1]-(window.$LU[1][0]*window.$LU[0][1])
        // window.$LU[2][1] = window.$A[2][1]-(window.$LU[2][0]*window.$LU[0][1])
        // window.$LU[1][2] = (window.$A[1][2]-(window.$LU[1][0]*window.$LU[0][2]))/window.$LU[1][1]
        // window.$LU[2][2] = window.$A[2][2]-(window.$LU[2][0]*window.$LU[0][2])-(window.$LU[2][1]*window.$LU[1][1])
        // window.$Y[0] = window.$B[0]/window.$LU[0][0]
        // window.$Y[1] = (window.$B[1]-(window.$Y[0]*window.$LU[1][0]))/window.$LU[1][1]
        // window.$Y[2] = (window.$B[1]-((window.$Y[0]*window.$LU[2][0]))-(window.$Y[1]*window.$LU[2][1]))/window.$LU[2][2]
        // window.$X[2] = Math.round(window.$Y[2])
        // window.$X[1] = Math.round(window.$Y[1]-(window.$LU[1][2]*window.$X[2]))
        // window.$X[0] = Math.round(window.$Y[0]-((window.$LU[0][1]*window.$X[1])+(window.$LU[0][2]*window.$X[2])))
        // window.$ANS.push(window.$X[0])
        // window.$ANS.push(window.$X[1])
        // window.$ANS.push(window.$X[2])
        // window.$A = [[-2,3,1],[3,4,-5],[1,-2,1]]
        // window.$B = [9,0,-4]
        // window.$X = [0,0,0]
        // window.$Y = [0,0,0]
        console.log("A : " + window.$A)
        console.log("B : " + window.$B)
        var size = window.$B.length
        window.$L = [...Array(size)].map(e => Array(size).fill(0))
        window.$U = [...Array(size)].map(e => Array(size).fill(0))
        window.$X = Array(size).fill(0)
        window.$Y = Array(size).fill(0)
        for(var i=0;i<window.$A.length;i++){
            for (var j=0;j<window.$A.length;j++){
                if(j>i){
                    window.$U[i][j] = window.$A[i][j];} 
                else{
                    if(i==j){
                        window.$U[i][j] = 1;}
                window.$L[i][j] = window.$A[i][j];
            }
            }
        }
        for(var k=0;k<window.$A.length;k++){
            for(var i=0;i<window.$A.length;i++){
                for(var j=0;j<window.$A.length;j++){
                    if(i>k){
                        if(j!=k){
                            window.$U[k][i] -= window.$L[k][j] * window.$U[j][i];}
                    }
                    else{
                        if(j!=i){
                            window.$L[k][i] -= window.$L[k][j] * window.$U[j][i];}
                    }
                }
                if(k>=i) {
                    window.$L[k][i] /= window.$U[i][i];}
                else{
                    window.$U[k][i] /= window.$L[k][k];}
            }
        }
        for(var i=0;i<window.$A.length;i++){
            window.$Y[i] = (window.$B[i] / window.$L[i][i]).toFixed(6)
            for(var j=i+1;j<window.$A.length;j++){
                window.$B[j] -= window.$L[j][i] * window.$Y[i];}
        }
        var k = 1
        for(var i=window.$A.length-1;i>=0;i--) {
            window.$X[i] = (window.$Y[i] / window.$U[i][i]).toFixed(6)
            window.$arr_Xi.push(k)
            k++
            for (j =i-1;j>=0;j--){
                window.$Y[j] -= window.$U[j][i] * window.$X[i];}
        }
        console.log("X : " + window.$X)
        console.log("Y : " + window.$Y)
        this.setState({update: this.state.update++});
      }

      createTable = () => {
        let table = []
        for (let i = -1; i < window.$X.length; i++) {
          let children = []
          if(i == -1){
            children.push(
                <th>Xi</th>,
                <th>ans</th>
                )
          }else{
            children.push(
                <td>{window.$arr_Xi[i]}</td>,
                <td>{window.$X[i]}</td>
                )
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
                    <p>LUDecomposition</p>
                </div>

                <div className="info1">
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
                    <div><button onClick={this.LUDecomposition}>submit</button></div>  
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
                                    y: window.$X
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
export default LUDecomposition;

