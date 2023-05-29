import { Component, FormEvent } from "react";

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

export default class Main extends Component<{}, State> {

    state: State = {
        members: [],
        name: '',
        gender: '',
        birth_date: '',
        banned: false,
        created_at: '',
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

    addNewMember = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { name, birth_date, gender } = this.state;
      
        const dbData = {
          name: name,
          birth_date: birth_date,
          gender: gender
        };
      
        try {
          let response = await fetch('http://localhost:3000/api/members', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dbData),
          });
      
          this.setState({
            name: '',
            birth_date: '',
            gender: ''
          });
      
          await this.loadMembers();
        } catch (error) {
          console.error('Error adding new member:', error);
        }
      }

      async handlePayment() {
        let response = await fetch('http://localhost:3000/api/members/1/pay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          await this.loadMembers();
      }
      
      async onLoad() {
        await this.loadMembers();
      }
      
      componentDidMount() {
        this.onLoad();
      }
      

    pictureDecider(gender: string) {
        let genderImage;
        if (gender === 'M') {
            return genderImage = (<img src={'male.png'} alt="" className="img-fluid" />)
        } else if (gender === 'F') {
            return genderImage = (<img src={'female.png'} alt="" className="img-fluid" />)
        } else {
            return genderImage = (<img src={'other.png'} alt="" className="img-fluid d-block m-auto" />)
        }
    }

    render() {
        return <><div className='ms-5 mt-5'>
            <nav>
                <a href="#" className='App ms-5'>Új tag felvétele</a> <a href="https://petrik.hu/" className='App ms-3'>Petrik honlap</a>
                <h2 className='ms-3 mt-4'>Petrik könyklub</h2>
            </nav>
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="col-lg-4">
                {this.state.members.map((members: Members) => (
                        <div className="card mt-2 ms-2 me-2">
                            <div className="card-body">
                                <h4 className="ms-2">{members.name}</h4>
                                <p className="ms-2"> Született: &ensp; {members.birth_date}</p>
                                <p className="ms-2">Csatlakozott: &ensp; {members.created_at}</p>
                                <div className="picture">{this.pictureDecider(members.gender)}</div>
                            </div>
                            <button className="btn" onClick={this.handlePayment}>Tagdij befizetése</button>
                        </div>
                ))}
                </div>
            </div>
            <form className="d-block m-auto form text-center" onSubmit={this.addNewMember}>
                    <h2>Tagfelvétel</h2>
                    <div className="d-block m-auto form-control">
                        <label htmlFor="nameInp">Név </label>
                        <br />
                        <input type="text" id="nameInp"  required value={this.state.name} onChange={e => this.setState({name: e.currentTarget.value})} /><br />
                        <label htmlFor="date">Születési Idő</label>
                        <br />
                        <input type="date" id="date" required value={this.state.birth_date} onChange={e => this.setState({birth_date: e.currentTarget.value})}/><br />
                        <label htmlFor="gender">Nem</label>
                        <br />
                        <input type="text" id="gender" required value={this.state.gender} onChange={e => this.setState({gender: e.currentTarget.value})}/><br />
                        <button type="submit">Hozzáadás</button>
                    </div>
            </form>
        </div>
            <footer className="ms-5 mt-5">
                <p>Készítette: Zuber Marcell</p>
            </footer></>
    }
}