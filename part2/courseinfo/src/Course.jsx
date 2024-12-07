const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
    const exercises_arr = parts.map(obj => (obj['exercises']))
    const total = exercises_arr.reduce((sum, currentVal) => {
            return sum + currentVal
        }, 0)
    return (
        <p>total of {total} exercises</p>
    )
    
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    return (
        <>
        {parts.map(subpart =>
            <Part key={subpart.id} part={subpart}/>
        )}  
        </>
    )
}


const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web dev curriculum</h1>
            {courses.map(course =>
                <div key={course.id}>
                    <Header course={course.name}/>
                    <Content parts={course.parts} />
                    <Total parts={course.parts}/>
                </div>
            )}

        </div>

    )
}

export default Course