const holdings=[
["AAPL","Apple Inc.","$175.35","+1.84%","42","$7,364.70"],
["NVDA","NVIDIA Corp.","$118.42","+3.21%","65","$7,697.30"],
["MSFT","Microsoft","$421.16","−0.44%","28","$11,792.48"],
["BTC","Bitcoin","$62,340.12","+2.76%","0.18","$11,221.22"],
["ETH","Ethereum","$3,012.60","−1.12%","2.4","$7,230.24"]];
const markets=[["S&P 500","5,420.18","+0.72%"],["NASDAQ","17,318.14","+1.06%"],["GOLD","$2,389.40","+0.34%"],["BTC","$62,340.12","+2.76%"]];
let watch=[["TSLA","Tesla","$248.36","+2.15%"],["AMZN","Amazon","$184.70","+0.88%"],["GOOGL","Alphabet","$171.20","−0.31%"]];
const $=s=>document.querySelector(s);
function render(){
 $("#holdings").innerHTML=holdings.map(x=>`<tr><td><div class="asset"><span class="coin">${x[0][0]}</span><div><b>${x[0]}</b><small>${x[1]}</small></div></div></td><td>${x[2]}</td><td class="${x[3].includes('−')? 'negative':'up'}">${x[3]}</td><td>${x[4]}</td><td><b>${x[5]}</b></td><td><button class="trade" onclick="openTrade('${x[0]}')">Trade</button></td></tr>`).join("");
 $("#marketsGrid").innerHTML=markets.map(x=>`<div class="market"><div class="market-top"><h4>${x[0]}</h4><span class="${x[2].includes('-')?'negative':'up'}">${x[2]}</span></div><div class="price">${x[1]}</div><canvas class="spark"></canvas></div>`).join("");
 document.querySelectorAll(".spark").forEach((c,i)=>spark(c,i));
 $("#watch").innerHTML=watch.map(x=>`<div class="watch"><span class="coin">${x[0][0]}</span><div><b>${x[0]}</b><small>${x[1]}</small></div><div class="price"><b>${x[2]}</b><small class="${x[3].includes('−')?'negative':'up'}">${x[3]}</small></div></div>`).join("");
}
function spark(c,seed){let ctx=c.getContext("2d"),w=c.clientWidth,h=35,d=[18,22,17,25,21,28,24,31,27,33,29].map((n,i)=>n+((seed*3+i)%5));c.width=w*2;c.height=h*2;ctx.scale(2,2);ctx.beginPath();d.forEach((v,i)=>{let x=i*w/(d.length-1),y=h-v;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle="#0aaa78";ctx.lineWidth=1.8;ctx.stroke()}
function drawChart(){let c=$("#chart"),ctx=c.getContext("2d"),w=c.clientWidth,h=c.clientHeight,d=[64,70,68,75,82,79,91,88,98,94,109,106,120,116,131,127,145,142,157];c.width=w*2;c.height=h*2;ctx.scale(2,2);let min=55,max=165;ctx.beginPath();d.forEach((v,i)=>{let x=i*w/(d.length-1),y=h-(v-min)/(max-min)*h*.83-5;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle="#0aaa78";ctx.lineWidth=3;ctx.stroke();let g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,"rgba(10,170,120,.18)");g.addColorStop(1,"rgba(10,170,120,0)");ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fillStyle=g;ctx.fill()}
function openTrade(asset="AAPL"){$("#asset").value=asset;$("#modalTitle").textContent=`Trade ${asset}`;$("#modal").classList.add("open")}
$("#newTrade").onclick=()=>openTrade();$("#addFunds").onclick=()=>{alert("Demo mode: no real money is transferred.");};$("#close").onclick=()=>$("#modal").classList.remove("open");$("#modal").onclick=e=>{if(e.target.id==="modal")e.currentTarget.classList.remove("open")};
$("#confirm").onclick=()=>{let n=$("#amount").value;if(!n||n<=0)return alert("Enter a valid amount.");$("#modal").classList.remove("open");alert(`${$("#side").value} order for $${Number(n).toLocaleString()} of ${$("#asset").value} recorded in demo mode.`)};
$("#addWatch").onclick=()=>{let t=prompt("Ticker symbol (example: META)");if(t){t=t.trim().toUpperCase();if(t)watch.unshift([t,"Custom watchlist","—","—"]);render()}};
$("#dismiss").onclick=e=>e.currentTarget.parentElement.remove();
$("#theme").onclick=()=>{document.documentElement.classList.toggle("dark");localStorage.apexTheme=document.documentElement.classList.contains("dark")?"dark":"light"};
if(localStorage.apexTheme==="dark")document.documentElement.classList.add("dark");
$("#menu").onclick=()=>$("#sidebar").classList.toggle("open");$("#logout").onclick=()=>alert("Demo sign-out action.");
$("#search").oninput=e=>{let q=e.target.value.toLowerCase();document.querySelectorAll("#holdings tr").forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?"":"none")};
render();drawChart();addEventListener("resize",()=>{drawChart();document.querySelectorAll(".spark").forEach((c,i)=>spark(c,i))});