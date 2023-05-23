import { Component } from "react";

interface Members {
    id: number;
    name: string;
    gender: string;
    birth_date: string;
    banned: boolean;
    created_at: string;
}

interface membersResponseList {
    members: Members[];
}

interface State {
    members: Members[];
    name: string;
    gender: string;
    birth_date: string;
    banned: boolean;
    created_at: string;
}

export default class Main extends Component<{},State> {  

    state: State = {
        members: [],
        name: '',
        gender:'',
        birth_date:'',
        banned:false,
        created_at:'',
    }

    async loadMembers() {
        try {
            let response = await fetch('http://localhost:3000/api/members');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json() as membersResponseList;
            if (data.members.length > 0) {
                this.setState({
                    members: data.members,
                });
            };
            }
         catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    componentDidMount() {
        this.loadMembers();
    }

    pictureDecider(gender: string) {
        let genderImage;
        if (gender === 'M') {
           return genderImage = (<img src={'male.png'} alt="" className="img-fluid" />)
          } else if (gender === 'F') {
            return genderImage = (<img src={'female.png'} alt="" className="img-fluid"/>)
          } else {
            return genderImage = (<img src={'other.png'} alt=""className="img-fluid d-block m-auto" />)
          }
    }

    render() {
        return <><div className='ms-5 mt-5'>
            <a href="#" className='App ms-5'>Új tag felvétele</a> <a href="https://petrik.hu/" className='App ms-3'>Petrik honlap</a>
            <h2 className='ms-3 mt-4'>Petrik könyklub</h2>
            <div className="col-lg-12">
                {this.state.members.map((members: Members) => (
                    <div className="col-lg-4">
                        <div className="card mt-2 ms-2 me-2">
                            <div className="card-body">
                                <h4 className="ms-2">{members.name}</h4>
                                <p className="ms-2"> Született: &ensp; {members.birth_date}</p>
                                <p className="ms-2">Csatlakozott: &ensp; {members.created_at}</p>
                                <div className="picture">{this.pictureDecider(members.gender)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <footer className="ms-5 mt-5">
                    <p>Készítette: Zuber Marcell</p>
            </footer></>
    }
}