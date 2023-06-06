import * as React from 'react';
//import styles from './Card.module.scss';
import { ICardProps } from './ICardProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'; //SPHttpClientConfiguration is declared but its value is never read.
import styles from './Card.module.scss';

//import { escape } from '@microsoft/sp-lodash-subset';
//import { divProperties } from 'office-ui-fabric-react';

//single item
interface ICardListItem {// 'IBookListItem' 
  Title: string,
  Description: string;
  Salary: number;
  DOB: any;
  Shift: string;
  Manager: any;
  Profile: string;
  MarriedStatus:boolean;
}
//multiple items
interface IAllItems {
  // 'IAllItems' 
  AllEmployee: ICardListItem[];
}
export default class List extends React.Component<
  ICardProps,
  IAllItems
> {
  constructor(props: ICardProps, state: IAllItems) {
    super(props);
    this.state = {
      AllEmployee: [],
    }
  };

  componentDidMount() {
    //alert ("Componenet Did Mount Called...");
    //console.log("First Call.....");
    this, this.getAllBookDetails();
  }

  public getAllBookDetails = () => {
    console.log("This is Book Detail function");
    //api call
    let listurl = `${this.props.listUrl}/_api/lists/GetByTitle('${this.props.listName}')/items`;
    console.log(listurl);

    this.props.context.spHttpClient
      .get(listurl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          //console.log(responseJSON);
          this.setState({ AllEmployee: responseJSON.value, })
        });
        console.log(this.state.AllEmployee);
      });
  };

  public render(): React.ReactElement<ICardProps> {
    return (
      <><div> <h2>EMPLOYEE INFO</h2></div><div className={styles.container}> {this.state.AllEmployee.map(emp => {
        return (
          <>
            <div className={styles.row}>
              <div className={styles.column} >
                <div className={styles.card}>
                  
                  <h4>Full Name:<h3>{emp.Title}</h3></h4>
                  /<h4>Profile: <h3> {emp.Profile}alt="" </h3></h4>
                  <h4>Description:<h3> {emp.Description}</h3></h4>
                  <h4>DOB:<h3> {emp.DOB}</h3></h4>
                  <h4>Salary:<h3>{emp.Salary}</h3></h4>
                  <h4>Shift:<h3>{emp.Shift}</h3></h4>
                  <h4>Married Status:<h3> {" "} {emp.MarriedStatus ? "YES":"No"}</h3></h4>
                  <h4>Manager:<h3>{emp.Manager}</h3></h4>
                </div>  </div>
                </div>
              
          </>
        );
      })}

      </div></>)
  }
}