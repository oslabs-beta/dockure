import React from 'react';
import ContainerItem from './containerItem';
import containerService from '../../services/containerService';
import { useDispatch } from 'react-redux';
import { setStateMetrics } from '../../redux/action/action.js';
import { useSelector } from 'react-redux';
import { timeSelector } from '../selectors/time.selector';
import Loader from '../loader';

const ContainerList = ({ conList, onCheckboxClickCallback, selectedIds }) => {
  const { time } = useSelector(timeSelector);
  const dispatch = useDispatch();
  const getData = async (id, containerState) => {
    let stats = {
      cpu: [],
      memory: [],
    };
    if (containerState === 'running')
      stats = await containerService.getMetrics(id, time);
    dispatch(setStateMetrics(stats));
  };

  if (!conList) return null;

  if (!conList.length) return <Loader />;

  const con = conList.map((container, inx) => {
    const isChecked = !!selectedIds[container.Id];
    return (
      <ContainerItem
        key={inx}
        onCheckboxClickCallback={onCheckboxClickCallback}
        getData={() => getData(container.Id, container.State)}
        container={container}
        isChecked={isChecked}
      />
    );
  });

  return <ul className='container_list'>{con}</ul>;
};

export default ContainerList;
