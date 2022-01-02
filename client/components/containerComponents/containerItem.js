import React from 'react';
import moment from 'moment';

const ContainerItem = ({
  container,
  getData,
  onCheckboxClickCallback,
  isChecked,
}) => {
  const utc = new Date(0);
  const date = utc.setUTCSeconds(container.Created);

  return (
    <li className='container_item'>
      <div className='item_name_time'>
        <div className='item_check'>
          <input
            type='checkbox'
            value={container.Id}
            checked={isChecked}
            className='item_checkbox'
            onChange={(e) => onCheckboxClickCallback(e.target.value)}
          />
          <div className='item_name'>{container.Names[0].slice(1)}</div>
        </div>
        <div className='item_createdat'>{moment(date).fromNow()}</div>
      </div>
      <div className='item_state_dateBtn'>
        <div className={`item_state ${containerStatus(container.State)}`}>
          {container.State}
        </div>
        <button className='item_dataBtn' onClick={getData}>
          Get Data
        </button>
      </div>
    </li>
  );
};

export default ContainerItem;

function containerStatus(state) {
  switch (state) {
    case 'running':
      return 'is_running';
    case 'exited':
      return 'is_exited';
    default:
      return 'is_else';
  }
}
