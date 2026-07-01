import './DeskUI.css'


export const DeskUI = () => {
    return (
        <div>
            <div className='desk-top'></div>
            <div className='desk-side' style={{ position: 'relative' }}>
                <div className='desk-hint'>スムージーの種類を選択してください<br />種類によって選べる具材が変わります</div>
            </div>
        </div>
    )
}