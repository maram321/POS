import React from 'react';
import { MdDateRange, MdOutlineAccountCircle } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import "./header.css"


const Header = ({user}) => {
     const useDate = () => {
        const locale = 'ar';
        const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update
      
        React.useEffect(() => {
            const timer = setInterval(() => { // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDate hook.
            setDate(new Date());
          }, 60 * 1000);
          return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
          }
        }, []);
      
        const day = today.toLocaleDateString(locale, { weekday: 'long' });
        const date = `${day} , ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;
      
        const hour = today.getHours();
        const wish = ` ${(hour < 12 && 'صباح') || 'مساء'} الخير   `;
      
        const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });
    
        return {
            date,
            time,
            wish,
          };
      
    };
    
    const { date, time, wish } = useDate();
    return ( 
        <div className='header'>
          <div className='wish'>
            <span><MdOutlineAccountCircle className='icon'/> {wish} </span>
            {user &&<span className="header-text"> {user.name} </span>}
          </div>
          <div className='today'>
            <div className='date'>
              <span className='date m-3'><MdDateRange className='icon'/>  {date}  </span>
            </div>
            <div>
              <span className='time'><IoMdTime className='icon'/>  {time}  </span>
            </div>

          </div>
        </div>
     );
}
 
export default Header;