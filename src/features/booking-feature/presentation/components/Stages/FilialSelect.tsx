import React, { useEffect, useState } from 'react'
import { LoadWrapper } from '../../../../../lib/ui/LoadWrapper'
import { Row } from 'antd'
import { InstanceCard } from '../../../../../lib/ui/InstanceCard'
import { ReqStatus } from '../../../../../lib/utils/enums'
import { RootState, useAppDispatch, useAppSelector } from '../../../../../app/store'
import { IInstance } from '../../../../../lib/utils/types'
import { allInstances } from '../../../../profile-feature/store/asyncActions'
import { setInstance } from '../../../store/slice'

const FilialSelect = () => {

    const dispatch = useAppDispatch();

    const selectedallInstances = useAppSelector((state: RootState) => state.profileReducer.allInstances);
    const selectedInstance = useAppSelector((state: RootState) => state.profileReducer.instance);
    const isLoading = useAppSelector((state: RootState) => state.allGames.requestStatus === ReqStatus.pending);
    const [selected, setSelected] = useState<IInstance | undefined>(
        selectedInstance
    );

    useEffect(() => {
        dispatch(allInstances());

        if (selectedallInstances.length === 1) {
            setSelected(selectedallInstances[0]);
        }
    }, [])



    const onCardClick = (instance: IInstance) => {
        setSelected(instance);
    };

    useEffect(() => {
        dispatch(setInstance(selected));
    }, [selected])

    return (
        <LoadWrapper isLoading={isLoading}>
            <Row justify="center" gutter={[20, 20]}>
                {selectedallInstances &&
                    selectedallInstances.map((instance) => (
                        <InstanceCard
                            instance={instance}
                            isSelected={selected?.id === instance.id}
                            onClick={onCardClick}
                            key={instance.id}
                        />
                    ))}
            </Row>
        </LoadWrapper>
    )
}

export default FilialSelect